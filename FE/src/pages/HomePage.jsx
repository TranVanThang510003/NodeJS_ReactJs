import React, { useEffect, useState } from 'react';
import MovieList from "../componets/movie/MovieList.jsx";
import MovieCategory from "../componets/movie/MovieCategory.jsx";
import TopRankings from "../componets/movie/TopRanking.jsx";
import { getMoviesApi,} from '../util/api.js';

import { useFavorites } from "../context/FavoriteProvider.jsx";

const HomePage = () => {
    const [newMovies, setNewMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("accessToken");
    const { favorites, toggleFavorite } = useFavorites();
    // Lấy phim + danh sách yêu thích song song
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
                console.error('Failed to fetch movies or favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);


    return (
      <div className="p-6 bg-[#131314] text-white">
          <MovieList
            movies={topRatedMovies}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          <div className="flex">
              <div className="w-5/7">
                  <MovieCategory
                    title="MỚI NHẤT"
                    movies={newMovies}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                  <MovieCategory
                    title="XEM NHIỀU NHẤT"
                    movies={popularMovies}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
              </div>
              <div className="w-2/7">
                  <TopRankings
                  />
              </div>
          </div>
      </div>
    );
};

export default HomePage;
