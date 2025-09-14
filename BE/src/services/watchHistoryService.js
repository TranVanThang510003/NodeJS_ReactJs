const WatchHistory = require("../models/watchHistory");

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
const  getWatchHistoryService = async (movieId, episodeId, userId) => {
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

module.exports = { createHistoryService, getWatchHistoryService };
