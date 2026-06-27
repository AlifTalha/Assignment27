const User = require('../models/User');
const News = require('../models/News');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../middleware/asyncHandler');

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const newsCount = await News.countDocuments({ author: req.user._id });

  res.json({
    success: true,
    data: {
      ...user.toObject(),
      newsCount,
    },
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, bio, avatar } = req.body;
  const updateData = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (bio !== undefined) updateData.bio = bio;
  if (avatar !== undefined) updateData.avatar = avatar;

  if (email && email !== req.user.email) {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new ApiError(400, 'Email already in use');
    }
  }

  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: user });
});

const getMyNews = asyncHandler(async (req, res) => {
  const news = await News.find({ author: req.user._id })
    .populate('author', 'name email avatar')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: news });
});

module.exports = { getProfile, updateProfile, getMyNews };
