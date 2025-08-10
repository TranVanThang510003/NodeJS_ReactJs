const {
  addFavoriteService,
  removeFavoriteService,
  getUserFavoritesService
} = require("../services/favoriteService");

// Thêm phim vào danh sách yêu thích
const addFavorite = async (req, res) => {
  const userId = req.user?.userId; // cần middleware auth để lấy user
  const movieId = req.params.movieId;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Bạn cần đăng nhập." });
  }

  const result = await addFavoriteService(userId, movieId);
  return res.status(result.statusCode).json(result);
};

// Xóa phim khỏi danh sách yêu thích
const removeFavorite = async (req, res) => {
  const userId = req.user?.userId;
  const movieId = req.params.movieId;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Bạn cần đăng nhập." });
  }

  const result = await removeFavoriteService(userId, movieId);
  return res.status(result.statusCode).json(result);
};

// Lấy danh sách yêu thích của người dùng
const getUserFavorites = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Bạn cần đăng nhập." });
  }

  const result = await getUserFavoritesService(userId);
  return res.status(result.statusCode).json(result);
};

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites
};
