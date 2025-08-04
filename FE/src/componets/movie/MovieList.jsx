import React, {useEffect, useState} from 'react';
import MovieCard from './MovieCard';
import '../../style/global.css'
import {getMovieApi} from '../../util/api.js';
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMovieApi(); // Gọi API
                setMovies(response); // Tùy vào format trả về của API
            } catch (err) {
                console.error('Error fetching movies:', err);
                setError('Failed to load movies.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);
    return (
        <div className="flex  overflow-x-auto p-2 scrollbar-hide scrollbar-custom ">
            <div className="flex space-x-2  ">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        image={movie.poster}
                        rating={movie.averageRating}
                        ratingCount={movie.ratingCount}
                        title={movie.title}
                        movieId={movie._id}
                        // stats={movie.stats}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;