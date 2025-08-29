import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMoviesApi } from '../../util/api.ts';
import FavoriteButton from '../common/FavoriteButton.tsx';
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, toggleFavorite } from "../../features/favoriteSlice.js";

const TopRankings = () => {
  const [topRanked, setTopRanked] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: favorites } = useSelector((state) => state.favorite);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if(token) {
      dispatch(fetchFavorites());
    }
  }, [dispatch]);
  useEffect(() => {

      const fetchTopRankedMovies = async () => {
        try {
          const movies = await getMoviesApi({
            sortBy: 'totalViews',
            sortOrder: 'desc',
            limit: 10
          });
          setTopRanked(movies);
        } catch (error) {
          console.error('Failed to fetch top ranked movies:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTopRankedMovies();
  }, []);

  if (loading) return <div className="text-white">Đang tải...</div>;

  return (
    <div className="w-full p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">RANKING</h2>

      {topRanked.map((movie) => (
        <div key={movie._id} className="flex items-center mb-4">
          {/* Ảnh phim */}
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-16 h-24 object-cover rounded mr-2 cursor-pointer"
            onClick={() => navigate(`/phim/${movie._id}`)}
          />
          {/* Thông tin */}
          <div
            className="flex-1 cursor-pointer"
            onClick={() => navigate(`/phim/${movie._id}`)}
          >
            <div className="text-sm font-semibold">{movie.title}</div>
            <div className="text-sm text-yellow-400">{movie.averageRating}★</div>
            <div className="text-xs text-gray-400">{movie.totalViews} lượt xem</div>
          </div>
          {/* Favorite button */}
          <FavoriteButton
            movieId={movie._id}
            favorites={favorites}
            toggleFavorite={(id) => dispatch(toggleFavorite(id))}
          />
        </div>
      ))}
    </div>
  );
};

export default TopRankings;
