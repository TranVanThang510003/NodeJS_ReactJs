const Movie = require("../models/movie");

const createMovieService = async (movieData) => {
    try {
        const newMovie = await Movie.create({
            title: movieData.title,
            originalTitle: movieData.originalTitle,
            country: movieData.country,
            releaseDate: movieData.releaseDate,
            genres: movieData.genres,
            description: movieData.description,
            poster: movieData.poster,
            videoUrl: movieData.videoUrl || null,
        });

        return {
            success: true,
            statusCode: 201,
            message: "Tạo phim thành công!",
            data: newMovie,
        };
    } catch (error) {
        console.error("Lỗi tạo phim:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi máy chủ khi tạo phim.",
        };
    }
};

module.exports = {
    createMovieService,
};
