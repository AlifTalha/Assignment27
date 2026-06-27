const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');

const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const contact = await Contact.create({ name, email, subject, message });

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: contact,
  });
});

module.exports = { sendMessage };
