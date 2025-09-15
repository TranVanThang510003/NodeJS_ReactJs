const WatchHistory = require("../models/watchHistory");
const Episode = require('../models/episode');
const Movie = require("../models/movie");
const Rating = require("../models/rating");

// --- 1. Lấy map lịch sử xem phim ---
const getUserWatchMap = async (userId) => {
  const histories = await WatchHistory.find({ userId }).lean();
  const watchMap = {};
  histories.forEach(h => {
    const mId = h.movieId.toString();
    if (!watchMap[mId]) watchMap[mId] = new Set();
    if (h.episodeId) watchMap[mId].add(h.episodeId.toString());
  });
  return watchMap;
};

// --- 2. Lấy tất cả phim + episodes + rating ---
const getMoviesWithEpisodesAndRating = async () => {
  const movies = await Movie.find().lean();
  const ratings = await Rating.aggregate([
    { $group: { _id: "$movieId", avgRating: { $avg: "$stars" } } },
  ]);
  const ratingMap = {};
  ratings.forEach(r => ratingMap[r._id.toString()] = r.avgRating);

  for (const movie of movies) {
    const episodes = await Episode.find({ movieId: movie._id }).lean();
    movie.episodes = episodes;
    movie.averageRating = ratingMap[movie._id.toString()] || 0;
  }
  return movies;
};

// --- 3. Kiểm tra phim đã xem hết ---
const markFullyWatched = (movies, watchMap) => {
  for (const movie of movies) {
    const watchedEpisodes = watchMap[movie._id.toString()] || new Set();
    movie.isFullyWatched = movie.episodes.length > 0 && watchedEpisodes.size >= movie.episodes.length;
  }
  return movies;
};

// --- 4. Xác định thể loại yêu thích ---
const getFavoriteGenre = (watchedMovies) => {
  const genreCount = {};
  watchedMovies.forEach(movie => {
    movie.genres?.forEach(g => genreCount[g] = (genreCount[g] || 0) + 1);
  });
  const sortedGenres = Object.keys(genreCount).sort((a,b) => (genreCount[b]||0) - (genreCount[a]||0));
  return sortedGenres[0] || null;
};

// --- 5. Kiểm tra phim có tập phát hành ---
const hasReleasedEpisode = (movie) => {
  const now = new Date();
  return movie.episodes?.some(ep => ep.releaseTime && new Date(ep.releaseTime) <= now);
};

// --- 6. Lấy danh sách gợi ý ---
const selectRecommendations = (movies, favoriteGenre, fullyWatchedIds) => {
  const sameGenreMovies = favoriteGenre
    ? movies.filter(m => !fullyWatchedIds.includes(m._id.toString()) && m.genres?.includes(favoriteGenre) && hasReleasedEpisode(m))
      .sort((a,b) => b.averageRating - a.averageRating)
    : [];

  const topRatedMovies = movies
    .filter(m => !fullyWatchedIds.includes(m._id.toString()) && hasReleasedEpisode(m))
    .sort((a,b) => b.averageRating - a.averageRating);

  let recommendations = [...sameGenreMovies];
  if (recommendations.length < 10) {
    const needed = 10 - recommendations.length;
    recommendations = [
      ...recommendations,
      ...topRatedMovies.filter(m => !recommendations.some(r => r._id.toString() === m._id.toString())).slice(0, needed)
    ];
  }
  return recommendations;
};

// --- 7. gợi ý phim---
const getRecommendationsService = async (userId) => {
  try {
    const watchMap = await getUserWatchMap(userId);
    let movies = await getMoviesWithEpisodesAndRating();
    movies = markFullyWatched(movies, watchMap);

    const watchedIds = Object.keys(watchMap);
    if (watchedIds.length === 0) {
      // User chưa xem gì -> top rating 5 phim
      return movies.filter(hasReleasedEpisode)
        .sort((a,b) => b.averageRating - a.averageRating)
        .slice(0,10);
    }

    const fullyWatchedIds = movies.filter(m => m.isFullyWatched).map(m => m._id.toString());
    const watchedMovies = movies.filter(m => watchedIds.includes(m._id.toString()));
    const favoriteGenre = getFavoriteGenre(watchedMovies);

    return selectRecommendations(movies, favoriteGenre, fullyWatchedIds);
  } catch (error) {
    console.error("❌ Lỗi trong getRecommendationsService:", error);
    throw error;
  }
};
module.exports = {
  getRecommendationsService
};