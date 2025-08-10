const mongoose = require("mongoose");
const Favorite = require("../models/favorite");
const Movie = require("../models/movie");


const addFavoriteService = async (userId, movieId) => {
  console.log(movieId);
  try {
    // Kiểm tra ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return {
        success: false,
        statusCode: 400,
        message: "ID phim không hợp lệ.",
      };
    }

    // Kiểm tra phim có tồn tại
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return {
        success: false,
        statusCode: 404,
        message: "Phim không tồn tại.",
      };
    }

    // Tạo bản ghi yêu thích
    const favorite = await Favorite.create({ userId, movieId });

    return {
      success: true,
      statusCode: 201,
      message: "Đã thêm vào danh sách yêu thích.",
      data: favorite,
    };
  } catch (err) {
    // Lỗi trùng dữ liệu (duplicate key)
    if (err.code === 11000) {
      return {
        success: false,
        statusCode: 400,
        message: "Phim đã có trong danh sách yêu thích.",
      };
    }

    // Lỗi CastError từ MongoDB
    if (err.name === "CastError") {
      return {
        success: false,
        statusCode: 400,
        message: "ID phim không hợp lệ.",
      };
    }

    console.error("Lỗi thêm vào yêu thích:", err);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi máy chủ.",
    };
  }
};


const removeFavoriteService = async (userId, movieId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return {
        success: false,
        statusCode: 400,
        message: "ID phim không hợp lệ.",
      };
    }

    const result = await Favorite.findOneAndDelete({ userId, movieId });
    if (!result) {
      return {
        success: false,
        statusCode: 404,
        message: "Phim không có trong danh sách yêu thích.",
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Đã xóa khỏi danh sách yêu thích.",
    };
  } catch (err) {
    console.error("Lỗi xóa yêu thích:", err);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi máy chủ.",
    };
  }
};
const getUserFavoritesService = async (userId) => {
  try {
    const favorites = await Favorite.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie"
        }
      },
      { $unwind: "$movie" },
      {
        $lookup: {
          from: "ratings",
          localField: "movie._id",
          foreignField: "movieId",
          as: "ratings"
        }
      },
      {
        $addFields: {
          "movie.averageRating": { $ifNull: [{ $avg: "$ratings.stars" }, 0] },
          "movie.ratingCount": { $size: "$ratings" }
        }
      },
      { $replaceRoot: { newRoot: "$movie" } } // Chỉ giữ movie object, giống movieId trong code cũ
    ]);

    return {
      success: true,
      statusCode: 200,
      data: favorites
    };
  } catch (err) {
    console.error("Lỗi lấy danh sách yêu thích:", err);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi máy chủ."
    };
  }
};



module.exports = {
  addFavoriteService,
  removeFavoriteService,
  getUserFavoritesService,
};
