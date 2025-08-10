const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // liên kết tới bảng user
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie', // liên kết tới bảng movie
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Đảm bảo 1 user không lưu trùng cùng 1 movie
favoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.models.favorite || mongoose.model('favorite', favoriteSchema);
