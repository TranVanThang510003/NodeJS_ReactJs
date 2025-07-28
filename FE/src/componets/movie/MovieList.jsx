import React from 'react';
import MovieCard from './MovieCard';
import '../../style/global.css'
const MovieList = () => {
    const movies = [
        {
            image: '/img/DHT.jpg',
            rating: '9.1',
            title: 'Đảo Hải Tặc',
            stats: '137 VS + 1128 TM',
        },
        {
            image: '/img/TN.jpeg',
            rating: '9.1',
            title: 'Tiên Nghịch',
            stats: '99 VS + 95 TM',
        },
        {
            image: '/img/TM.jpg',
            rating: '9.5',
            title: 'Trong Tông Môn Trù...',
            stats: '68 VS + 84 TM',
        },
        {
            image: '/img/TN.jpeg',
            rating: '8.7',
            title: 'Naruto Shippuden',
            stats: 'Full 500 VS',
        },
        {
            image: '/img/TM.jpg',
            rating: '9.5',
            title: 'Trong Tông Môn Trù...',
            stats: '68 VS + 84 TM',
        },
        {
            image: '/img/D.jpg',
            rating: '9.5',
            title: 'Doraemon',
            stats: '873 VS + 500 TM',
        },
        {
            image: '/img/D.jpg',
            rating: '9.5',
            title: 'Doraemon',
            stats: '873 VS + 500 TM',
        },
        {
            image: '/img/TN.jpeg',
            rating: '9.1',
            title: 'Tiên Nghịch',
            stats: '99 VS + 95 TM',
        },
        {
            image: '/img/TM.jpg',
            rating: '9.5',
            title: 'Trong Tông Môn Trù...',
            stats: '68 VS + 84 TM',
        },
    ];

    return (
        <div className="flex  overflow-x-auto p-2 scrollbar-hide scrollbar-custom ">
            <div className="flex space-x-2  ">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        image={movie.image}
                        rating={movie.rating}
                        title={movie.title}
                        stats={movie.stats}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;