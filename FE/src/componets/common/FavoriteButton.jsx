
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButton = ({ movieId, favorites, toggleFavorite  }) => {
  const isFavorite = Array.isArray(favorites)
    && favorites.some(fav => String(fav.movieId || fav._id) === String(movieId));


  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(movieId);
      }}
      className="cursor-pointer transition-all duration-300"
    >
      {isFavorite ? (
        <FaHeart
          size={25}
          className="text-red-500 transition-transform duration-300 transform hover:scale-125 drop-shadow-md"
        />
      ) : (
        <FaRegHeart
          size={25}
          className="text-gray-500 transition-transform duration-300 transform hover:scale-125 hover:text-red-400"
        />
      )}
    </div>
  );
};

export default FavoriteButton;
