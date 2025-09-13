import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { getMoviesApi, getMovieByIdApi } from "../util/api";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setMovies([]); // reset
      setLoading(true);
      try {
        const response = await getMoviesApi();
        const sortedMovies: Movie[] = response.data.sort(
            (a: Movie, b: Movie) =>
                new Date(b.releaseDate ?? "").getTime() -
                new Date(a.releaseDate ?? "").getTime()
        );
        setMovies(sortedMovies);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

// Hook lấy chi tiết 1 phim
export const useMovie = (movieId: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setMovie(null); // reset
      setLoading(true);
      try {
        const response = await getMovieByIdApi(movieId);
        setMovie(response.data as Movie);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};
