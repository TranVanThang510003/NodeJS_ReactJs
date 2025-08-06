const {createEpisodeService,deleteEpisodeService,updateEpisodeService, increaseViewService} = require("../services/episodeService");

const createEpisode = async(req,res)=>{
    console.log(req.body);


    const result = await  createEpisodeService(
        req.body
    );
    return res.status(result.statusCode).json(result);
}


const deleteEpisode = async (req, res) => {
    const episodeId = req.params.id;
    const result = await deleteEpisodeService(episodeId);
    return res.status(result.statusCode).json(result);
};

const updateEpisode = async (req, res) => {
    const episodeId = req.params.id;
    const updateData = req.body;
    const result = await updateEpisodeService(episodeId, updateData);
    return res.status(result.statusCode).json(result);
};

const increaseViews = async (req, res) => {
    try {
        const updatedEpisode = await increaseViewService(req.params.id);
        res.json(updatedEpisode);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi tăng lượt xem' });
    }
};

module.exports = {
    createEpisode,deleteEpisode,updateEpisode,increaseViews
};