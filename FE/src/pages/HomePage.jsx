import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MovieList from "../componets/movie/MovieList.jsx";
import MovieCategory from "../componets/movie/MovieCategory.jsx";
import TopRankings from "../componets/movie/TopRanking.jsx";
import { getMoviesApi } from '../util/api.js';
import { fetchFavorites, toggleFavorite } from "../features/favoriteSlice.js";

const HomePage = () => {
    const dispatch = useDispatch();

    const [newMovies, setNewMovies] = React.useState([]);
    const [popularMovies, setPopularMovies] = React.useState([]);
    const [topRatedMovies, setTopRatedMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const { items: favorites } = useSelector((state) => state.favorite);

    const token = localStorage.getItem("accessToken");

    // fetch movies
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [latest, popular, rated] = await Promise.all([
                    getMoviesApi({ sortBy: 'latestEpisodeDate', sortOrder: 'desc', limit: 10 }),
                    getMoviesApi({ sortBy: 'totalViews', sortOrder: 'desc', limit: 10 }),
                    getMoviesApi({ sortBy: 'averageRating', sortOrder: 'desc', limit: 10 }),
                ]);

                setNewMovies(latest);
                setPopularMovies(popular);
                setTopRatedMovies(rated);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    // fetch favorites nếu có token
    useEffect(() => {
        if (token) {
            dispatch(fetchFavorites());
        }
    }, [token, dispatch]);

    return (
      <div className="p-6 bg-[#131314] text-white">
          <MovieList
            movies={topRatedMovies}
            favorites={favorites}
            toggleFavorite={(id) => dispatch(toggleFavorite(id))}
          />
          <div className="flex">
              <div className="w-5/7">
                  <MovieCategory
                    title="MỚI NHẤT"
                    movies={newMovies}
                    favorites={favorites}
                    toggleFavorite={(id) => dispatch(toggleFavorite(id))}
                  />
                  <MovieCategory
                    title="XEM NHIỀU NHẤT"
                    movies={popularMovies}
                    favorites={favorites}
                    toggleFavorite={(id) => dispatch(toggleFavorite(id))}
                  />
              </div>
              <div className="w-2/7">
                  <TopRankings />
              </div>
          </div>
      </div>
    );
};

export default HomePage;
