import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/favoriteSlice";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorite.items);

  const isFavorite = Array.isArray(favorites)
    && favorites.some(fav => String(fav.movieId || fav._id) === String(movieId));

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // tránh click lan sang MovieCard
    dispatch(toggleFavorite(movieId));
  };

  return (
    <div
      onClick={handleToggle}
      className="cursor-pointer transition-all duration-300"
    >
      {isFavorite ? (
        <FaHeart
          size={25}
          className="text-orange-500 transition-transform duration-300 transform hover:scale-125 drop-shadow-md"
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
