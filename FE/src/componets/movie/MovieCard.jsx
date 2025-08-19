import {useNavigate} from "react-router-dom";
import FavoriteButton from "../common/FavoriteButton.jsx";
const MovieCard = ({ image, rating,ratingCount, title, stats, movieId, favorites, toggleFavorite }) => {

    const navigate= useNavigate();
    const handleCardClick = () => {
    navigate(`/phim/${movieId}`)
    };

    return (
      <div
        className="relative w-45 h-72 mt-2 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={handleCardClick}>
        {/* Movie Poster */}
        <img src={image} alt={title} className="w-full h-full object-cover"/>

        {/* Rating Badge */}
        <div
          className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <span className="text-yellow-400">★</span> {rating}
        </div>
        <div className="absolute top-2 right-2">
          <FavoriteButton movieId={movieId} favorites={favorites}  toggleFavorite={toggleFavorite} />
        </div>

        {/* Title and Stats */}
        <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-70 text-white p-2 text-center">
          <h3 className="text-sm font-semibold truncate">{title}</h3>
          <p className="text-xs text-yellow-400">{stats}</p>
        </div>

      </div>
    );
};

export default MovieCard;