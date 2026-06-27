const express = require('express');
const authRoutes = require('./authRoutes');
const newsRoutes = require('./newsRoutes');
const userRoutes = require('./userRoutes');
const contactRoutes = require('./contactRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/users', userRoutes);
router.use('/contact', contactRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'News Portal API is running' });
});

module.exports = router;
