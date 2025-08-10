
import { createContext, useState, useEffect, useContext } from "react";
import { getFavoritesApi, addFavoriteApi, deleteFavoriteApi } from "../util/api";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;
    (async () => {
      const res = await getFavoritesApi();
      setFavorites(res.data || []);
    })();
  }, [token]);

  const toggleFavorite = async (movieId) => {
    if (!token) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này.");
      return;
    }
    const isFav = favorites.some(f => String(f.movieId || f._id) === String(movieId));
    if (isFav) {
      const res = await deleteFavoriteApi({ movieId });
      if (res.success) {
        setFavorites(prev => prev.filter(f => String(f.movieId || f._id) !== String(movieId)));
      }
    } else {
      const res = await addFavoriteApi({ movieId });
      if (res.success) {
        setFavorites(prev => [...prev, { movieId }]);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
