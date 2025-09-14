const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
  episodeId:{type: mongoose.Schema.Types.ObjectId, ref: 'episode', required: true},
  progress:{type:Number, default:0},
  watchedAt: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false }

}, { timestamps: true });
module.exports = mongoose.model('watch_history', watchHistorySchema);
