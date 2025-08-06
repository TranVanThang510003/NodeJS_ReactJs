import React, {useEffect, useState} from 'react';
import MovieCard from './MovieCard';
import '../../style/global.css'

const MovieList = ({  movies }) => {

    return (
        <div className="flex  overflow-x-auto p-2 scrollbar-hide scrollbar-custom ">
            <div className="flex space-x-2  ">
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
        </div>
    );
};

export default MovieList;