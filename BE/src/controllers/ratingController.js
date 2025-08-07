const { createOrUpdateRating, getRatingsByMovie,addComment,getCommentsByMovie } = require('../services/ratingService');

const handleRating = async (req, res) => {
  try {
    const { movieId, stars } = req.body;

    if (!movieId || !stars) {
      return res.status(400).json({ success: false, message: 'Thiếu movieId hoặc số sao' });
    }

    const userId = req.user?.userId;

    const result = await createOrUpdateRating({ movieId, userId, stars });

    return res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

const getMovieRatings = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Thiếu movieId' });
    }

    const ratings = await getRatingsByMovie(movieId);
    return res.status(200).json({ success: true, ratings });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};


const postComment = async (req, res) => {
  const { movieId, content } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
  }

  const result = await addComment({ movieId, userId, content });
  res.status(result.success ? 200 : 500).json(result);
};

const getComments = async (req, res) => {
  const { movieId } = req.params;

  const result = await getCommentsByMovie(movieId);
  res.status(result.success ? 200 : 500).json(result);
};



module.exports = {
  handleRating,
  getMovieRatings,
  postComment,
  getComments
};
