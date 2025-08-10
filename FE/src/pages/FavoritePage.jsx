import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFavoritesApi} from '../util/api.js';
import MovieCategory from '../componets/movie/MovieCategory.jsx';
import {useFavorites} from '../Context/FavoriteProvider.jsx'

const FavoritePage = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 15;
  const { favorites, toggleFavorite } = useFavorites();



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getFavoritesApi();
        const data = Array.isArray(res) ? res : res?.data || []; // Đảm bảo là array
        setMovies(data);
        setTotalPages(data.length ? Math.ceil(data.length / itemsPerPage) : 1);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);


  const paginatedMovies = movies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Hàm tạo danh sách số trang với dấu ...
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, page + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="p-6 text-white">
      <div className=" space-x-2">

          <h2
            className="inline-flex items-center px-4 py-2 mt-4 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg"
          >
            <span className="mr-2">Danh Sách Phim Yêu Thích</span>
          </h2>
          <MovieCategory title="" movies={paginatedMovies} loading={loading} favorites={favorites} toggleFavorite={toggleFavorite}  />

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

            {getPageNumbers().map((num, idx) =>
              num === "..." ? (
                <span key={idx} className="px-3 py-2">...</span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setPage(num)}
                  className={`px-4 py-2 rounded ${
                    page === num ? "bg-orange-500" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {num}
                </button>
              )
            )}

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
    </div>
  );
};

export default FavoritePage;
