import React from 'react';

const TopRankings = ({ movies }) => {
    return (
        <div className="w-full p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-500 mb-4">BXH</h2>
            {movies.map((movie, index) => (
                <div key={index} className="flex items-center mb-4">
                    <img src={movie.image} alt={movie.title} className="w-16 h-24 object-cover rounded mr-2" />
                    <div>
                        <div className="text-sm font-semibold">{movie.title}</div>
                        <div className="text-xs text-yellow-400">{movie.rating}</div>
                        <div className="text-xs text-gray-400">{movie.stats}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopRankings;