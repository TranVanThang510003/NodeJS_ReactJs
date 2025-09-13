import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/favoriteSlice";
import {message} from "antd";
import type { RootState, AppDispatch } from "../../redux/store";
interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state:RootState) => state.favorite.items);
  const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);
  const isFavorite = Array.isArray(favorites)
    && favorites.some(fav => String(fav.movieId || fav._id) === String(movieId));

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("FavoriteButton clicked", { movieId, isFavorite, isLoggedIn });
    if (isLoggedIn) {
      dispatch(toggleFavorite(movieId) as any);
    } else {
      message.warning("Vui lòng đăng nhập để sử dụng tính năng này");
    }
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
