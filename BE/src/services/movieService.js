const WatchHistory = require("../models/watchHistory");
const Episode = require('../models/episode');
const Movie = require("../models/movie");
const Rating = require("../models/rating");
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

const getMoviesService = async (query) => {
    const {
        sortBy = 'latest',
        limit = 20,
        minRating = 0,
        minVotes = 0,
        hasNewEpisode, // số ngày
        country,       // tên quốc gia
        genre,         // tên thể loại
        year           // năm phát hành
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
    if (country && country.trim() !== "" && country !== "Tất cả") {
        matchConditions.push({ country });
    }

    if (genre && genre.trim() !== "") {
        matchConditions.push({ genres: { $in: [genre] } });
    }
    if (query.name && query.name.trim() !== "") {
        matchConditions.push({
            $or: [
                { title: { $regex: query.name.trim(), $options: "i" } },
                { originalTitle: { $regex: query.name.trim(), $options: "i" } }
            ]
        });
    }
    if (year) {
        const start = new Date(`${year}-01-01`);
        const end = new Date(`${year}-12-31`);
        matchConditions.push({ releaseDate: { $gte: start, $lte: end } });
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

const getRecommendationsService = async (userId) => {
    try {
        // 1. Lấy lịch sử xem
        const histories = await WatchHistory.find({ userId }).lean();

        // Gom nhóm lịch sử theo movieId
        const historyMap = {};
        histories.forEach((h) => {
            const mId = h.movieId.toString();
            if (!historyMap[mId]) historyMap[mId] = new Set();
            historyMap[mId].add(h.episodeId?.toString());
        });

        // 2. Lấy tất cả phim
        const movies = await Movie.find().lean();
        const now = new Date();

        // Gắn episodes vào từng movie
        for (const movie of movies) {
            const episodes = await Episode.find({ movieId: movie._id }).lean();
            movie.episodes = episodes;

            // Kiểm tra đã xem hết chưa
            const watchedEpisodes = historyMap[movie._id.toString()] || new Set();
            movie.isFullyWatched =
              episodes.length > 0 && watchedEpisodes.size >= episodes.length;
        }

        // Danh sách phim đã xem ít nhất 1 tập
        const watchedIds = Object.keys(historyMap);

        // Chỉ đánh dấu phim đã xem hết toàn bộ tập
        const fullyWatchedIds = movies
          .filter((m) => m.isFullyWatched)
          .map((m) => m._id.toString());

        // 2.2 Gắn rating trung bình
        const ratings = await Rating.aggregate([
            { $group: { _id: "$movieId", avgRating: { $avg: "$stars" } } },
        ]);
        const ratingMap = {};
        ratings.forEach((r) => {
            ratingMap[r._id.toString()] = r.avgRating;
        });
        for (const movie of movies) {
            movie.averageRating = ratingMap[movie._id.toString()] || 0;
        }

        // Helper check phim có tập phát hành
        const hasReleasedEpisode = (movie) => {
            if (!movie.episodes || movie.episodes.length === 0) return false;
            return movie.episodes.some(
              (ep) => ep.releaseTime && new Date(ep.releaseTime) <= now
            );
        };

        // === CASE 1: User chưa xem gì -> top rating ===
        if (watchedIds.length === 0) {
            console.log("User chưa có lịch sử -> trả về top rating");
            const result = movies
              .filter((m) => hasReleasedEpisode(m))
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5);

            return result;
        }

        // === CASE 2: User có lịch sử ===
        // 2.1 Lấy phim đã xem (chưa cần xem hết)
        const watchedMovies = movies.filter((m) =>
          watchedIds.includes(m._id.toString())
        );

        // 2.2 Thống kê thể loại
        const genreCount = {};
        watchedMovies.forEach((movie) => {
            movie.genres?.forEach((g) => {
                genreCount[g] = (genreCount[g] || 0) + 1;
            });
        });

        const favoriteGenre = Object.keys(genreCount).sort(
          (a, b) => (genreCount[b] ?? 0) - (genreCount[a] ?? 0)
        )[0];

        // 2.3 Phim cùng thể loại, sắp xếp theo rating
        const sameGenreMovies = favoriteGenre
          ? movies
            .filter(
              (m) =>
                !fullyWatchedIds.includes(m._id.toString()) &&
                m.genres?.includes(favoriteGenre) &&
                hasReleasedEpisode(m)
            )
            .sort((a, b) => b.rating - a.rating)
          : [];

        // 2.4 Fallback top rating (ẩn phim đã xem hết)
        const topRatedMovies = movies
          .filter(
            (m) => !fullyWatchedIds.includes(m._id.toString()) && hasReleasedEpisode(m)
          )
          .sort((a, b) => b.rating - a.rating);

        // 2.5 Merge: lấy phim cùng thể loại trước, thiếu thì bổ sung top rating
        let recommendations = [...sameGenreMovies];
        if (recommendations.length < 10) {
            const needed = 10 - recommendations.length;
            recommendations = [
                ...recommendations,
                ...topRatedMovies
                  .filter(
                    (m) =>
                      !recommendations.some((r) => r._id.toString() === m._id.toString())
                  )
                  .slice(0, needed),
            ];
        }

        console.log(
          recommendations.map((m) => `${m.title} (rating: ${m.rating})`)
        );

        return recommendations;
    } catch (error) {
        console.error("❌ Lỗi trong getRecommendationsService:", error);
        throw error;
    }
};


module.exports = {
    createMovieService, deleteMovieService,updateMovieService,getMovieByIdService,getMoviesService,getRecommendationsService
};
