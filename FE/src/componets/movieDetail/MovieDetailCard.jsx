import React, {useEffect, useState} from 'react';
import { Flex, Rate } from 'antd';
import "../../style/global.css";
import {getMovieByIdApi} from "../../util/api.js";
import {useParams} from "react-router-dom";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const MovieDetailCard = ( { title, setSelectedEpisode}) => {
    const [movie,setMovie] = useState({});
    const {movieId} = useParams()
    useEffect(()=>{
        const fetchData = async () => {
            const response= await getMovieByIdApi(movieId)
            setMovie(response)
            console.log(response)
        }
            fetchData()
    },[])
    // const movieData = {
    //     image: '/img/LD.jpg',
    //     title: "Dũng Sĩ Otaku Béo",
    //     genres: "Busamen Gachi Fighter, Uglymug, Epicfighter",

    //     country: "Nhật Bản",
    //     year: "2025",
    //     description:
    //         "Đường Sĩ Otaku Béo kể về ông chú Shigeru Yoshioka một đời tất cả sự nghiệp...",
    // };
    const year = new Date(movie.releaseDate).getFullYear();


    const handleWatchClick = () => {
        setSelectedEpisode(1); // Mở tập 1
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
                        <Rate
                            className="custom-rate"
                            allowHalf
                            tooltips={desc}
                            // onChange={handleRatingChange}
                            // value={value}
                        />
                        <div className='text-yellow-500 font-semibold text-lg'>
                            {movie.averageRating} / 5 ({movie.ratingCount} đánh giá)
                        </div>
                    </Flex>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailCard;
