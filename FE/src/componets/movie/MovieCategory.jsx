
import React from 'react';
import MovieCard from './MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MovieCategory = ({ title, movies }) => {
    return (
        <div className="mb-6 relative mt-4">
            <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
            <div className="flex flex-wrap space-x-2 overflow-x-auto scrollbar-hide">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        image={movie.poster}
                        rating={movie.averageRating}
                        title={movie.title}
                        stats={movie.stats}
                        movieId={movie._id}
                    />
                ))}
            </div>
            <div className="w-full mt-2 flex justify-end">
                <div className="text-orange-500 flex px-4 py-2  cursor-pointer items-center space-x-1 mr-8 hover:text-orange-700 transition duration-300">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <span>Xem thêm</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCategory;
