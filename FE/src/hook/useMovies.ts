import { useEffect, useState } from 'react'
import { getMoviesApi,getMovieByIdApi } from '../util/api.js'

export const useMovies=()=>{
const [movies, setMovies]=useState([])
  const [loading, setLoading] = useState(true)
  const [error,setError]=useState(null)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMoviesApi();
        setMovies(response.data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)));
        console.log(response.data);
      } catch (err) {
        setError(err)
        }finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return{ movies, loading, error };
};

export const useMovie = (movieId)=>{
  const [movie,setMovie]=useState({})
  const [loading, setLoading]=useState(true)
  const [error,setError]=useState(null)
  useEffect(() => {
    if (!movieId) return;
    const fetchMovie = async () => {
      try {
      const response = await getMovieByIdApi(movieId);
        setMovie(response.data)
      }catch (err){
        setError(err)
      }finally {
        setLoading(false)
      }
    }
    fetchMovie();
  }, [movieId])
  return {movie,loading, error}
}