import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "../../style/global.css";
import type { Movie } from "../../types/movie";
import { getMoviesApi } from "../../util/api";

const RecommendedMovieList: React.FC = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm check phim có ít nhất 1 tập đã phát hành
  const hasReleasedEpisode = (movie: Movie): boolean => {
    if (!movie.episodes || movie.episodes.length === 0) return false;
    const now = new Date();
    return movie.episodes.some(
        (ep) => ep.releaseTime && new Date(ep.releaseTime) <= now
    );
  };

  useEffect(() => {
    const cached = localStorage.getItem("recommendations");
    if (cached) {
      setRecommendedMovies(JSON.parse(cached));
      setLoading(false); // hiển thị ngay cache
    }
    const fetchMovies = async (): Promise<void> => {
      try {
        const stored = localStorage.getItem("watchHistory");
        const history: string[] = stored
            ? (JSON.parse(stored) as { movieId: string }[]).map((ep) => ep.movieId)
            : [];

        const watchedIds: string[] = Array.from(new Set(history));

        const allMovies = await getMoviesApi({ limit: 100, sortBy: "rating" });
        const movies: Movie[] = allMovies.data;

        // --- Ưu tiên 1: phim đang xem ---
        const watchingMovies = movies.filter(
            (m) => watchedIds.includes(m._id) && hasReleasedEpisode(m)
        );

        // --- Ưu tiên 2: phim cùng thể loại ---
        const genreCount: Record<string, number> = {};
        watchingMovies.forEach((movie) => {
          movie.genres?.forEach((g) => {
            genreCount[g] = (genreCount[g] || 0) + 1;
          });
        });

        const favoriteGenre: string | undefined = Object.keys(genreCount)
            .sort((a, b) => (genreCount[b] ?? 0) - (genreCount[a] ?? 0))[0];

        const sameGenreMovies = favoriteGenre
            ? movies.filter(
                (m) =>
                    !watchedIds.includes(m._id) &&
                    m.genres?.includes(favoriteGenre) &&
                    hasReleasedEpisode(m)
            )
            : [];

        // --- Ưu tiên 3: fallback theo rating ---
        const topRatedMovies = movies.filter(
            (m) => !watchedIds.includes(m._id) && hasReleasedEpisode(m)
        );

        // --- Merge ---
        const combined: Movie[] = [
          ...watchingMovies,
          ...sameGenreMovies,
          ...topRatedMovies,
        ];

        // Loại bỏ trùng lặp theo _id
        const uniqueMovies: Movie[] = Array.from(
            new Map(combined.map((m) => [m._id, m])).values()
        ).slice(0, 10);
// update state + cache
        setRecommendedMovies(uniqueMovies);
        localStorage.setItem("recommendations", JSON.stringify(uniqueMovies));

      } catch (error) {
        console.error("Lỗi khi fetch phim:", error);
        setRecommendedMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
