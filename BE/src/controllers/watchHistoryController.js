const {createHistoryService,   getEpisodeWatchHistoryService, getWatchedMoviesService, getMovieWatchHistoryService} = require("../services/watchHistoryService");


const createHistory = async(req,res)=>{
  console.log(req.body);
  const userId = req.user?.userId;
  const result = await  createHistoryService(req.body,userId);
  return res.status(result.statusCode).json(result);
}
//danh sách tiến trình xem 1 video  các tập phim  của 1 movie
const getWatchHistory  = async(req,res)=>{
  const { movieId, episodeId } = req.params;
  const userId = req.user?.userId;
  const result = await   getEpisodeWatchHistoryService( movieId, episodeId,userId);
  return res.status(result.statusCode).json(result);
}

//danh sách các movie từng xem của người dùng
const getWatchedMovies  = async(req,res)=>{
  const userId = req.user?.userId;
  const result = await   getWatchedMoviesService(userId);
  return res.status(result.statusCode).json(result);
}
//danh sách tiến trình tát cả  video  các tập phim  của 1 movie
const getMovieWatchHistory  = async(req,res)=>{
  const { movieId } = req.params;
  const userId = req.user?.userId;
  const result = await   getMovieWatchHistoryService( movieId ,userId);
  return res.status(result.statusCode).json(result);
}

module.exports = { createHistory, getWatchHistory, getMovieWatchHistory ,getWatchedMovies};