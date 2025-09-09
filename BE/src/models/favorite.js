const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // liên kết tới bảng user
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie', // liên kết tới bảng Movie
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Đảm bảo 1 user không lưu trùng cùng 1 Movie
favoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.models.favorite || mongoose.model('favorite', favoriteSchema);
