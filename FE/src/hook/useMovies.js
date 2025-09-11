import { useEffect, useState } from 'react'
import { getMovieApi } from '../util/api.js'

const useMovies=()=>{
const [movies, setMovies]=useState([])
  const [loading, setLoading] = useState(true)
  const [error,setError]=useState(null)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovieApi();
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
export  default useMovies