const express = require('express');
const routeAPI = express.Router();
const {createUser, handleLogin, getUser ,updateAccountType,getAllUser } = require('../controllers/userController');
const auth = require("../middleware/auth");
const {createMovie, deleteMovie,updateMovie, getAllMovie,getMovieById,getMovies} = require("../controllers/movieController");
const {createEpisode, deleteEpisode,updateEpisode,increaseViews} = require("../controllers/episodeController");
const { handleRating ,postComment,getComments } = require('../controllers/ratingController');
const { addFavorite, removeFavorite, getUserFavorites} = require("../controllers/favoriteController");
 // routeAPI.all('/{*any}', auth);
routeAPI.post('/register',createUser)
routeAPI.post('/login',handleLogin)
routeAPI.get('/user', getAllUser)
routeAPI.get('/me',auth, getUser)
routeAPI.post('/movies',createMovie)
routeAPI.post('/movies/:movieId/episodes',createEpisode)
routeAPI.delete('/episodes/:id',deleteEpisode)
routeAPI.delete('/movies/:id',deleteMovie)
routeAPI.put('/episodes/:id', updateEpisode);
routeAPI.put('/movies/:id', updateMovie);
routeAPI.get('/movies', getAllMovie);
routeAPI.get('/movies/:id', getMovieById)
routeAPI.get('/movie/filter', getMovies);
routeAPI.post('/episodes/:id/increase-views', increaseViews);


routeAPI.put('/user/update-account-type', auth, updateAccountType);
routeAPI.post('/ratings', auth, handleRating);
routeAPI.post('/comments', auth, postComment);
routeAPI.post('/comments/:movieId', getComments);

routeAPI.post('/favorites/:movieId', auth, addFavorite);
routeAPI.delete('/favorites/:movieId', auth, removeFavorite);
routeAPI.get('/favorites', auth, getUserFavorites);
module.exports= routeAPI;
