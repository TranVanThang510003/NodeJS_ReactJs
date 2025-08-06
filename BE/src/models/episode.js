const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true
    },
    title: String,
    episodeNumber: Number,
    videoUrl: String,
    isPremium: {
        type: Boolean,
        default: false
    },
    releaseTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }

});

const Episode = mongoose.model('episode', episodeSchema);
module.exports = Episode;
