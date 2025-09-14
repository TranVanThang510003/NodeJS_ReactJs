const {createHistoryService,   getWatchHistoryService} = require("../services/watchHistoryService");


const createHistory = async(req,res)=>{
  console.log(req.body);
  const userId = req.user?.userId;
  const result = await  createHistoryService(req.body,userId);
  return res.status(result.statusCode).json(result);
}
const getWatchHistory  = async(req,res)=>{
  const { movieId, episodeId } = req.params;
  const userId = req.user?.userId;
  const result = await   getWatchHistoryService( movieId, episodeId,userId);
  return res.status(result.statusCode).json(result);
}

module.exports = { createHistory, getWatchHistory };