
const Movie = require('../models/movie');
const { deleteMovieService, createMovieService,  updateMovieService,getMovieByIdService,getMoviesService} = require("../services/movieService");



const createMovie = async(req,res)=>{
    console.log(req.body);


    const result = await  createMovieService(
        req.body


    );
    return res.status(result.statusCode).json(result);
}

const deleteMovie = async (req, res) => {
    const movieId = req.params.id;
    const result = await deleteMovieService(movieId);
    return res.status(result.statusCode).json(result);
};
const updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const updateData = req.body;
    const result = await updateMovieService(movieId, updateData);
    return res.status(result.statusCode).json(result);
};




const getMovieById = async (req, res) => {
    const movieId = req.params.id;
    const data = await getMovieByIdService(movieId);
    if (!data) {
        return res.status(404).json({ message: "Không tìm thấy phim." });
    }
    return res.status(200).json(data);
};
const getMovies = async (req, res) => {
    try {
        const result = await getMoviesService(req.query);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi khi lấy danh sách phim." });
    }
};


module.exports = {
    createMovie,deleteMovie,updateMovie, getMovieById,getMovies,
};