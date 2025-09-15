
const { getRecommendationsService} = require("../services/recommendService");

const getRecommendations=async(req,res)=>{
  const userId = req.user?.userId;
  try {
    const result = await getRecommendationsService(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi khi lấy danh sách phim." });
  }
}

module.exports = {
  getRecommendations
};