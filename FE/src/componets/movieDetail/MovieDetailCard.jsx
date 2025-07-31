import React, { useState } from 'react';
import { Flex, Rate } from 'antd';
import "../../style/global.css";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const MovieDetailCard = ( { title, setSelectedEpisode}) => {
    const movieData = {
        image: '/img/LD.jpg',
        title: "Dũng Sĩ Otaku Béo",
        genres: "Busamen Gachi Fighter, Uglymug, Epicfighter",
        episodes: "04 VS + 02 TM",
        country: "Nhật Bản",
        year: "2025",
        description:
            "Đường Sĩ Otaku Béo kể về ông chú Shigeru Yoshioka một đời tất cả sự nghiệp...",
    };

    const [value, setValue] = useState(0); // người dùng vừa đánh giá
    const [ratings, setRatings] = useState([4, 4.5, 5, 3, 3.5]); // danh sách đánh giá

    const average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);

    const handleRatingChange = (newValue) => {
        setRatings([...ratings, newValue]);
        setValue(newValue);
    };
    const handleWatchClick = () => {
        setSelectedEpisode(1); // Mở tập 1
    };

    return (
        <div className={`flex justify-center items-center`}>
            <div className={`p-4 rounded-lg flex items-center w-full relative`} onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                    <img src={movieData.image} alt={title} className="w-60 h-80 object-cover rounded-md" />
                    <button className="bg-red-700 text-white px-4 py-4 rounded hover:bg-red-600 absolute bottom-0 w-full opacity-80" onClick={handleWatchClick}>
                        XEM PHIM
                    </button>
                </div>
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{movieData.title}</h2>
                    <p className="text-gray-300 mb-2">{movieData.genres}</p>
                    <p className="text-gray-400 mb-4">{movieData.episodes} | {movieData.country} | {movieData.year}</p>
                    <p className="text-gray-300 text-sm mb-4">{movieData.description}</p>

                    <Flex gap="middle" align="center">
                        <Rate
                            className="custom-rate"
                            allowHalf
                            tooltips={desc}
                            onChange={handleRatingChange}
                            value={value}
                        />
                        {value ? <span className="text-white">{desc[value - 1]}</span> : null}
                        <div className='text-yellow-500 font-semibold text-lg'>
                            {average} / 5 ({ratings.length} đánh giá)
                        </div>
                    </Flex>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailCard;
