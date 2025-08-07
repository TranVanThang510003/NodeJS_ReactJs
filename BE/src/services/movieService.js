const Episode = require('../models/episode');
const Movie = require("../models/movie");
const {Types} = require("mongoose");

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


const deleteMovieService = async (movieId) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return {
                success: false,
                statusCode: 404,
                message: "Phim không tồn tại.",
            };
        }

        // Xóa tất cả các tập phim liên quan
        await Episode.deleteMany({ movieId });

        // Xóa phim
        await Movie.findByIdAndDelete(movieId);

        return {
            success: true,
            statusCode: 200,
            message: "Đã xóa phim và toàn bộ tập phim liên quan.",
        };
    } catch (error) {
        console.error("Lỗi khi xóa phim:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi máy chủ khi xóa phim.",
        };
    }
};

const updateMovieService = async (id, updatedData) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
        if (!movie) {
            return {
                success: false,
                statusCode: 404,
                message: "Không tìm thấy phim để cập nhật.",
            };
        }

        return {
            success: true,
            statusCode: 200,
            message: "Cập nhật phim thành công.",
            data: movie,
        };
    } catch (error) {
        console.error("Lỗi khi cập nhật phim:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi máy chủ khi cập nhật phim.",
        };
    }
};
const getMovieService = async () => {
    try {
        const result = await Movie.aggregate([
            {
                $lookup: {
                    from: 'ratings',               // tên collection ratings
                    localField: '_id',             // khóa từ Movie
                    foreignField: 'movie',         // khóa từ Rating
                    as: 'ratings'                  // gộp kết quả vào field
                }
            },
            {
                $addFields: {
                    averageRating: {
                        $ifNull: [{ $avg: "$ratings.stars" }, 0] // nếu không có thì là 0
                    },
                    ratingCount: { $size: "$ratings" } // số lượt đánh giá
                }
            }
        ]);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getMoviesService = async (query) => {
    const {
        sortBy = 'latest',
        limit = 20,
        minRating = 0,
        minVotes = 0,
        hasNewEpisode // số ngày
    } = query;

    const sortStage = {};
    switch (sortBy) {
        case 'popular':
            sortStage.popularityScore = -1;
            break;
        case 'rating':
            sortStage.averageRating = -1;
            break;
        case 'totalViews':
            sortStage.totalViews = -1;
            break;
        case 'latest':
        default:
            sortStage.latestEpisodeDate = -1;
            break;
    }

    const matchConditions = [];
    if (minRating) {
        matchConditions.push({ averageRating: { $gte: Number(minRating) } });
    }
    if (minVotes) {
        matchConditions.push({ ratingCount: { $gte: Number(minVotes) } });
    }
    if (hasNewEpisode) {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - Number(hasNewEpisode));
        matchConditions.push({ latestEpisodeDate: { $gte: daysAgo } });
    }

    const result = await Movie.aggregate([
        {
            $lookup: {
                from: 'episodes',
                localField: '_id',
                foreignField: 'movieId',
                as: 'episodes'
            }
        },
        {
            $addFields: {
                latestEpisodeDate: { $max: "$episodes.createdAt" },
                totalViews: { $sum: "$episodes.views" }
            }
        },
        {
            $lookup: {
                from: 'ratings',
                localField: '_id',
                foreignField: 'movieId',
                as: 'ratings'
            }
        },
        {
            $addFields: {
                averageRating: { $ifNull: [{ $avg: "$ratings.stars" }, 0] },
                ratingCount: { $size: "$ratings" }
            }
        },
        {
            $addFields: {
                popularityScore: {
                    $add: [
                        { $multiply: [0.7, { $ifNull: ["$ratingCount", 0] }] },
                        { $multiply: [0.3, { $ifNull: ["$averageRating", 0] }] }
                    ]
                }
            }
        },
        ...(matchConditions.length > 0 ? [{ $match: { $and: matchConditions } }] : []),
        { $sort: sortStage },
        { $limit: Number(limit) }
    ]);

    return result;
};



const getMovieByIdService = async (movieId) => {
    try {
        const objectId = new Types.ObjectId(movieId);
        const movie = await Movie.aggregate([
            { $match: { _id: objectId } },
            {
                $lookup: {
                    from: "ratings",
                    localField: "_id",
                    foreignField: "movieId",
                    as: "ratings"
                }
            },
            {
                $addFields: {
                    averageRating: { $ifNull: [{ $avg: "$ratings.stars" }, 0] },
                    ratingCount: { $size: "$ratings" }
                }
            },
            // Lấy danh sách episodes
            {
                $lookup: {
                    from: "episodes",
                    localField: "_id",
                    foreignField: "movieId",
                    as: "episodes"
                }
            },

            // Sắp xếp danh sách tập phim theo số tập
            {
                $addFields: {
                    episodes: {
                        $sortArray: { input: "$episodes", sortBy: { episodeNumber: 1 } }
                    }
                }
            }


        ]);

        return movie[0]; // Vì match theo id nên kết quả là 1 phần tử
    } catch (error) {
        console.error("Lỗi lấy phim theo ID:", error);
        throw error;
    }
};



module.exports = {
    createMovieService, deleteMovieService,updateMovieService,getMovieService,getMovieByIdService,getMoviesService,
};
