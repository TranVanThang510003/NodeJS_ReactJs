const WatchHistory = require("../models/watchHistory");
const Movie = require("../models/movie");
const { Types } = require("mongoose");

const createHistoryService = async (historyData, userId) => {
  try {
    // Tìm lịch sử xem cũ
    let existingHistory = await WatchHistory.findOne({
      userId: userId,
      movieId: historyData.movieId,
      episodeId: historyData.episodeId,
    });

    if (existingHistory) {
      // Chỉ update nếu progress mới lớn hơn
      if (historyData.progress > existingHistory.progress) {
        existingHistory.progress = historyData.progress;
        existingHistory.isCompleted = historyData.progress >= 85 || historyData.isCompleted;
        existingHistory.watchedAt = new Date();
        await existingHistory.save();
      }
      return {
        success: true,
        statusCode: 200,
        message: "Cập nhật lịch sử xem thành công!",
        data: existingHistory,
      };
    } else {
      // Nếu chưa có lịch sử thì tạo mới
      const newHistory = await WatchHistory.create({
        userId: userId,
        movieId: historyData.movieId,
        episodeId: historyData.episodeId,
        progress: historyData.progress,
        isCompleted: historyData.progress >= 85 || historyData.isCompleted,
        watchedAt: new Date(),
      });
      return {
        success: true,
        statusCode: 201,
        message: "Tạo lịch sử xem thành công!",
        data: newHistory,
      };
    }
  } catch (error) {
    console.error("Lỗi tạo lịch sử xem phim:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi máy chủ khi tạo lịch sử xem phim.",
    };
  }
};

// Lấy lịch sử xem của user theo movie + episode
const  getEpisodeWatchHistoryService = async (movieId, episodeId, userId) => {
  try {
    const history = await WatchHistory.findOne({
      userId,
      movieId,
      episodeId,
    });

    if (history) {
      return {
        success: true,
        statusCode: 200,
        data: history,
        message: "Lấy lịch sử xem thành công",
      };
    }

    // Nếu chưa có lịch sử
    return {
      success: true,
      statusCode: 200,
      data: null,
      message: "Chưa có lịch sử xem",
    };
  } catch (error) {
    console.error("Lỗi lấy lịch sử xem:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi máy chủ khi lấy lịch sử xem",
    };
  }
};

const getMovieWatchHistoryService = async (movieId, userId) => {
  try {
    const histories = await WatchHistory.find({ userId, movieId }).lean();

    const watchedEpisodeIds = histories.map(h => h.episodeId.toString());

    return {
      success: true,
      statusCode: 200,
      data: watchedEpisodeIds,
      message: watchedEpisodeIds.length
        ? "Lấy danh sách tập đã xem thành công"
        : "Chưa xem tập nào",
    };
  } catch (error) {
    console.error("Lỗi lấy lịch sử xem:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi máy chủ khi lấy lịch sử xem",
    };
  }
};

// --- Lấy danh sách phim đã xem  ---
const getWatchedMoviesService = async (userId) => {
  try {
    const histories = await WatchHistory.find({ userId }).lean();
    const watchedIds = [...new Set(histories.map(h => h.movieId.toString()))];

    if (watchedIds.length === 0) {
      return {
        success: true,
        statusCode: 200,
        message: "Chưa có phim đã xem",
        data: []
      };
    }

    const objectIds = watchedIds.map(id => new Types.ObjectId(id));

    let movies = await Movie.aggregate([
      { $match: { _id: { $in: objectIds } } },
      {
        $lookup: {
          from: "episodes",
          localField: "_id",
          foreignField: "movieId",
          as: "episodes"
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
      }
    ]);

    // Map movieId -> latestWatchedAt
    const latestWatchMap = {};
    histories.forEach(h => {
      const mId = h.movieId.toString();
      if (!latestWatchMap[mId] || new Date(h.watchedAt) > new Date(latestWatchMap[mId])) {
        latestWatchMap[mId] = h.watchedAt;
      }
    });

    // Đánh dấu isFullyWatched + gắn latestWatchedAt
    const watchMap = {};
    histories.forEach(h => {
      const mId = h.movieId.toString();
      if (!watchMap[mId]) watchMap[mId] = new Set();
      if (h.episodeId) watchMap[mId].add(h.episodeId.toString());
    });

    for (const movie of movies) {
      const watchedEpisodes = watchMap[movie._id.toString()] || new Set();
      movie.isFullyWatched =
        movie.episodes.length > 0 &&
        watchedEpisodes.size >= movie.episodes.length;

      movie.latestWatchedAt = latestWatchMap[movie._id.toString()] || null;
    }

    // Sort theo latestWatchedAt (mới nhất lên trước)
    movies.sort((a, b) => new Date(b.latestWatchedAt) - new Date(a.latestWatchedAt));

    return {
      success: true,
      statusCode: 200,
      message: "Lấy danh sách phim đã xem thành công",
      data: movies
    };
  } catch (error) {
    console.error("Lỗi lấy danh sách phim đã xem:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi máy chủ khi lấy danh sách phim đã xem",
      data: null
    };
  }
};




module.exports = {
  createHistoryService,
  getEpisodeWatchHistoryService,  // Lấy chi tiết lịch sử xem cho 1 movie + episode
  getWatchedMoviesService,// Lấy danh sách tất cả phim đã xem
  getMovieWatchHistoryService
};
