import React, { useEffect, useState } from 'react';
import MovieList from "../componets/movie/MovieList.jsx";
import MovieCategory from "../componets/movie/MovieCategory.jsx";
import TopRankings from "../componets/movie/TopRanking.jsx";
import { getMoviesApi } from '../util/api.js';

const HomePage = () => {
    const [newMovies, setNewMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Lấy danh sách phim mới nhất (sort theo latestEpisodeDate)
                const latest = await getMoviesApi({
                    sortBy: 'latestEpisodeDate',
                    sortOrder: 'desc',
                    limit: 10
                });

                // Lấy danh sách phim phổ biến nhất (sort theo totalViews)
                const popular = await getMoviesApi({
                    sortBy: 'totalViews',
                    sortOrder: 'desc',
                    limit: 10
                });

                const rated = await getMoviesApi({
                    sortBy: 'averageRating',
                    sortOrder: 'desc',
                    limit: 10
                });

                setNewMovies(latest);
                setPopularMovies(popular);
                setTopRatedMovies(rated);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const topRankedMovies = [...popularMovies.slice(0, 5)];

    return (
      <div className="p-6 bg-[#131314] text-white">
          <MovieList  movies={topRatedMovies} />
          <div className="flex ">
              <div className="w-5/7">
                  <MovieCategory title="MỚI NHẤT" movies={newMovies} />
                  <MovieCategory title="XEM NHIỀU NHẤT" movies={popularMovies} />
              </div>
              <div className="w-2/7">
                  <TopRankings movies={topRankedMovies} />
              </div>
          </div>
      </div>
    );
};

export default HomePage;
