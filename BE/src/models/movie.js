const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    originalTitle: String,
    country: String,
    releaseDate: Date,
    genres: [String],
    description: String,
    poster: String,
    videoUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;
