const express = require('express');
const { getProfile, updateProfile, getMyNews } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/my-news', protect, getMyNews);

module.exports = router;
