const Comment = require('../models/comment');
const RatingService = require('../models/rating');

const createOrUpdateRating = async ({ movieId, userId, stars }) => {
  try {
    const existing = await RatingService.findOne({ movieId, userId });

    if (existing) {
      existing.stars = stars;
      await existing.save();
      return { success: true, message: 'Đã cập nhật đánh giá.' };
    }

    await RatingService.create({ movieId, userId, stars });
    return { success: true, message: 'Đã tạo đánh giá.' };
  } catch (error) {
    console.error('Lỗi khi đánh giá phim:', error);
    return { success: false, message: 'Lỗi hệ thống.' };
  }
};

const getRatingsByMovie = async (movieId) => {
  return RatingService.find({ movieId }).populate('userId', 'username');
};



const addComment = async ({ movieId, userId, content }) => {
  try {
    const newComment = await Comment.create({ movieId, userId, content });
    return { success: true, message: 'Bình luận thành công', data: newComment };
  } catch (error) {
    console.error('Lỗi khi thêm bình luận:', error);
    return { success: false, message: 'Không thể thêm bình luận' };
  }
};

const getCommentsByMovie = async (movieId) => {
  try {
    const comments = await Comment.find({ movieId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    return { success: true, data: comments };
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bình luận:', error);
    return { success: false, message: 'Không thể lấy bình luận' };
  }
};


module.exports = {
  createOrUpdateRating,
  getRatingsByMovie,
  addComment,
  getCommentsByMovie,

};
