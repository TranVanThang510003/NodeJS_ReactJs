import React, { useEffect, useState } from 'react'
import { getMoviesApi } from '../../util/api.js'

const TopRankings = () => {
  const [topRanked, setTopRanked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRankedMovies = async () => {
      try {
        const movies = await getMoviesApi({
          sortBy: 'totalViews',
          sortOrder: 'desc',
          limit: 5
        });
        setTopRanked(movies);
      } catch (error) {
        console.error("Failed to fetch top ranked movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRankedMovies();
  }, []);

  if (loading) return <div className="text-white">Đang tải...</div>;

  return (
    <div className="w-full p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">BXH</h2>
      {topRanked.map((movie, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded mr-2" />
          <div>
            <div className="text-sm font-semibold">{movie.title}</div>
            <div className="text-sm text-yellow-400">{movie.averageRating}★</div>
            <div className="text-xs text-gray-400">{movie.totalViews} lượt xem</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRankings;
