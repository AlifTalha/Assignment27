const express = require('express');
const { sendMessage } = require('../controllers/contactController');
const { validateFields } = require('../middleware/validate');

const router = express.Router();

router.post('/', validateFields('name', 'email', 'subject', 'message'), sendMessage);

module.exports = router;
