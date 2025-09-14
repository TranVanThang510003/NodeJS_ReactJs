import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import "../../style/global.css";
import type { Movie } from "../../types/movie";
import { getRecommendationsApi } from "../../util/api";
import type { RootState } from "../../redux/store";

const RecommendedMovieList: React.FC = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // lấy topRated từ redux khi chưa login
  const { topRated } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("accessToken");

    // Nếu chưa login -> dùng topRated luôn
    if (!isLoggedIn) {
      setRecommendedMovies(topRated);
      setLoading(false);
      return;
    }

    // Nếu đã login -> fetch recommendations
    const cached = localStorage.getItem("recommendations");
    if (cached) {
      setRecommendedMovies(JSON.parse(cached));
      setLoading(false);
    }

    const fetchMovies = async () => {
      try {
        const res = await getRecommendationsApi();
        const movies: Movie[] = res.data;

        setRecommendedMovies(movies);
        localStorage.setItem("recommendations", JSON.stringify(movies));
      } catch (error) {
        console.error("Lỗi khi fetch phim:", error);
        setRecommendedMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [topRated]);

  if (loading) {
    return <p className="text-gray-400 p-4">Đang tải dữ liệu...</p>;
  }

  if (recommendedMovies.length === 0) {
    return <p className="text-gray-400 p-4">Không có phim để đề xuất</p>;
  }

  return (
      <div className="mt-2">
        <h2 className="text-xl font-bold mb-2">ĐỀ XUẤT</h2>
        <div className="flex overflow-x-auto scrollbar-hide scrollbar-custom p-2">
          <div className="flex space-x-2">
            {recommendedMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
  );
};

export default RecommendedMovieList;
