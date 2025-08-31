import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../common/FavoriteButton';
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";

const TopRankings: React.FC = () => {
  const navigate = useNavigate();


  const { topRated, loading } = useSelector((state: RootState) => state.movie);



  if (loading) return <div className="text-white">Đang tải...</div>;

  return (
    <div className="w-full p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">RANKING</h2>

      {topRated.map((movie) => (
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
          />
        </div>
      ))}
    </div>
  );
};

export default TopRankings;
