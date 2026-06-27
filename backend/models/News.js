const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'World'],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

newsSchema.pre('save', function (next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + (this.content.length > 150 ? '...' : '');
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);
