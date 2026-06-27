const express = require('express');
const {
  getAllNews,
  getTopNews,
  getLatestNews,
  getNewsByCategory,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect } = require('../middleware/auth');
const { validateFields } = require('../middleware/validate');

const router = express.Router();

router.get('/', getAllNews);
router.get('/top', getTopNews);
router.get('/latest', getLatestNews);
router.get('/category/:category', getNewsByCategory);
router.get('/:id', getNewsById);

router.post('/', protect, validateFields('title', 'content', 'category'), createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;
