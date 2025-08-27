import React, {useEffect, useState} from 'react';
import { Flex, message, Rate } from 'antd'
import "../../style/global.css";
import { getMovieByIdApi, rating } from '../../util/api.ts'
import {useParams} from "react-router-dom";

import FavoriteButton from '../common/FavoriteButton.jsx'
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, toggleFavorite } from "../../features/favoriteSlice";
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const MovieDetailCard = ( { title, setSelectedEpisode}) => {
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorite);
    useEffect(() => {
        dispatch(fetchFavorites()); // load favorites khi vào
    }, [dispatch]);

    const [movie,setMovie] = useState({});
    const {movieId} = useParams()
    const [value, setValue] = useState(0);
    useEffect(()=>{
        const fetchData = async () => {
            const response= await getMovieByIdApi(movieId)
            setMovie(response)
            console.log(response)
        }
            fetchData()
    },[])

    const year = new Date(movie.releaseDate).getFullYear();


    const handleWatchClick = () => {
        setSelectedEpisode(1); // Mở tập 1
    };
    const handleRatingChange = async (value) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            message.warning("Vui lòng đăng nhập để đánh giá phim");
            return;
        }
        try {
            setValue(value);
            const res = await rating(movieId, value);
            console.log(res)
            if (res?.success) {
                message.success(res.message || "Đánh giá thành công");
            } else {
                message.error("Đánh giá thất bại");
            }

        } catch (err) {
            console.error(err);
            message.error("Có lỗi khi đánh giá phim");
        }
    };

    return (
        <div className={`flex justify-center items-center`}>
            <div className={`p-4 rounded-lg flex items-center w-full relative`} onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                    <img src={movie.poster} alt={title} className="w-60 h-80 object-cover rounded-md" />
                    <button className="bg-red-700 text-white px-4 py-4 rounded hover:bg-red-600 absolute bottom-0 w-full opacity-80" onClick={handleWatchClick}>
                        XEM PHIM
                    </button>
                </div>
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                    <p className="text-gray-300 mb-2">{movie.genres}</p>
                    <p className="text-gray-400 mb-4">  {movie.country} | {year}</p>
                    <p className="text-gray-300 text-sm mb-4 h-32 overflow-y-auto pr-2 ">
                        {movie.description}
                    </p>

                    <Flex gap="middle" align="center">
                        <div className="flex justify-between">

                            <Rate
                                className="custom-rate"
                                allowHalf
                                tooltips={desc}
                                onChange={handleRatingChange}
                                value={value}
                            />
                            <div className='text-yellow-500 font-semibold text-lg'>
                                {movie.averageRating} / 5 ({movie.ratingCount} đánh giá)
                            </div>
                        </div>
                        <div className="ml-40">
                            <FavoriteButton  movieId={movieId} favorites={favorites}  toggleFavorite={(id) => dispatch(toggleFavorite(id))} />
                        </div>
                    </Flex>

                </div>
            </div>
        </div>
    );
};

export default MovieDetailCard;
