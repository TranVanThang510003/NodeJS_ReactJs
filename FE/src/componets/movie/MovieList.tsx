import React from "react";
import MovieCard from "./MovieCard";
import "../../style/global.css";
import type { Movie } from "../../types/movie";

// Props của MovieList
interface MovieListProps {
    movies: Movie[];

}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <p className="text-gray-400 p-4">Không có phim để hiển thị</p>;
    }

    return (
        <div className="flex overflow-x-auto p-2 scrollbar-hide scrollbar-custom">
            <div className="flex space-x-2">
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
