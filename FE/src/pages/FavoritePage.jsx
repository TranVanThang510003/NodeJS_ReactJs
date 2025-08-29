import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, toggleFavorite } from "../features/favoriteSlice.ts";
import MovieCategory from "../componets/movie/MovieCategory.tsx";

const FavoritePage = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const dispatch = useDispatch();
  const { items: favorites, loading } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, searchParams]);

  const totalPages = favorites.length
    ? Math.ceil(favorites.length / itemsPerPage)
    : 1;

  const paginatedMovies = favorites.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-6 text-white">
      <h2 className="inline-flex items-center px-4 py-2 mt-4 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg">
        Danh Sách Phim Yêu Thích
      </h2>

      <MovieCategory
        title=""
        movies={paginatedMovies}
        loading={loading}
        favorites={favorites}
        toggleFavorite={(id) => dispatch(toggleFavorite(id))}
      />

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
          Trang đầu
        </button>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${
              page === i + 1
                ? "bg-orange-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
          &gt;
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
          Trang cuối
        </button>
      </div>
    </div>
  );
};

export default FavoritePage;
