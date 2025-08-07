const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
  watchedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('watch_history', watchHistorySchema);
