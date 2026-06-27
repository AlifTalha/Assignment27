const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateFields } = require('../middleware/validate');

const router = express.Router();

router.post('/register', validateFields('name', 'email', 'password'), register);
router.post('/login', validateFields('email', 'password'), login);
router.get('/me', protect, getMe);

module.exports = router;
