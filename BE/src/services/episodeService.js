const Episode = require("../models/episode");
const Movie = require("../models/movie");

const createEpisodeService = async (episodeData) => {
    try {
        // Kiểm tra phim tồn tại
        const movie = await Movie.findById(episodeData.movieId);
        console.log(episodeData.movieId)
        if (!movie) {
            return {
                success: false,
                statusCode: 404,
                message: "Không tìm thấy phim để thêm tập!",
            };
        }

        // Kiểm tra releaseTime
        if (!episodeData.releaseTime) {
            return {
                success: false,
                statusCode: 400,
                message: "Thiếu thời gian phát hành (releaseTime).",
            };
        }

        const newEpisode = await Episode.create({
            movieId: episodeData.movieId,
            title: episodeData.title,
            episodeNumber: episodeData.episodeNumber,
            videoUrl: episodeData.videoUrl,
            isPremium: episodeData.isPremium || false,
            releaseTime: new Date(episodeData.releaseTime),
        });

        return {
            success: true,
            statusCode: 201,
            message: "Tạo tập phim thành công!",
            data: newEpisode,
        };
    } catch (error) {
        console.error("Lỗi tạo tập phim:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi máy chủ khi tạo tập phim.",
        };
    }
};

const deleteEpisodeService = async (episodeId) => {
    try {
        const episode = await Episode.findById(episodeId);
        if (!episode) {
            return {
                success: false,
                statusCode: 404,
                message: "Tập phim không tồn tại.",
            };
        }

        await Episode.findByIdAndDelete(episodeId);

        return {
            success: true,
            statusCode: 200,
            message: "Đã xóa tập phim thành công.",
        };
    } catch (error) {
        console.error("Lỗi khi xóa tập phim:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi máy chủ khi xóa tập phim.",
        };
    }
};

const updateEpisodeService = async (id, updatedData) => {
    try {
        const episode = await Episode.findByIdAndUpdate(id, updatedData, { new: true });
        if (!episode) {
            return {
                success: false,
                statusCode: 404,
                message: "Không tìm thấy tập phim để cập nhật.",
            };
        }

        return {
            success: true,
            statusCode: 200,
            message: "Cập nhật tập phim thành công.",
            data: episode,
        };
    } catch (error) {
        console.error("Lỗi khi cập nhật tập phim:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi máy chủ khi cập nhật tập phim.",
        };
    }
};

const increaseViewService = async (episodeId) => {
    return await Episode.findByIdAndUpdate(
      episodeId,
      { $inc: { views: 1 } },
      { new: true }
    );
};

module.exports = {
    createEpisodeService,deleteEpisodeService, updateEpisodeService,increaseViewService
};
