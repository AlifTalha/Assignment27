const News = require('../models/News');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../middleware/asyncHandler');

const AUTHOR_FIELDS = 'name email avatar';
const AUTHOR_DETAIL_FIELDS = 'name email avatar bio';

const getAllNews = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 12 } = req.query;
  const query = { isPublished: true };

  if (category) query.category = category;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const [news, total] = await Promise.all([
    News.find(query)
      .populate('author', AUTHOR_FIELDS)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    News.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: news,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

const getTopNews = asyncHandler(async (req, res) => {
  const news = await News.find({ isPublished: true })
    .populate('author', AUTHOR_FIELDS)
    .sort({ views: -1, createdAt: -1 })
    .limit(6);

  res.json({ success: true, data: news });
});

const getLatestNews = asyncHandler(async (req, res) => {
  const news = await News.find({ isPublished: true })
    .populate('author', AUTHOR_FIELDS)
    .sort({ createdAt: -1 })
    .limit(6);

  res.json({ success: true, data: news });
});

const getNewsByCategory = asyncHandler(async (req, res) => {
  const news = await News.find({ category: req.params.category, isPublished: true })
    .populate('author', AUTHOR_FIELDS)
    .sort({ createdAt: -1 })
    .limit(4);

  res.json({ success: true, data: news });
});

const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id).populate('author', AUTHOR_DETAIL_FIELDS);

  if (!news) {
    throw new ApiError(404, 'News not found');
  }

  news.views += 1;
  await news.save();

  res.json({ success: true, data: news });
});

const createNews = asyncHandler(async (req, res) => {
  const { title, content, category, image, excerpt } = req.body;

  const news = await News.create({
    title,
    content,
    category,
    image,
    excerpt,
    author: req.user._id,
  });

  const populated = await News.findById(news._id).populate('author', AUTHOR_FIELDS);

  res.status(201).json({ success: true, data: populated });
});

const updateNews = asyncHandler(async (req, res) => {
  let news = await News.findById(req.params.id);

  if (!news) {
    throw new ApiError(404, 'News not found');
  }

  if (news.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to edit this news');
  }

  news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('author', AUTHOR_FIELDS);

  res.json({ success: true, data: news });
});

const deleteNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    throw new ApiError(404, 'News not found');
  }

  if (news.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to delete this news');
  }

  await news.deleteOne();

  res.json({ success: true, message: 'News deleted successfully' });
});

module.exports = {
  getAllNews,
  getTopNews,
  getLatestNews,
  getNewsByCategory,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
