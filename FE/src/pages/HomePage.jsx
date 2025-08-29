import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MovieList from "../componets/movie/MovieList.jsx";
import MovieCategory from "../componets/movie/MovieCategory.tsx";
import TopRankings from "../componets/movie/TopRanking.jsx";
import {
    fetchNewMovies,
    fetchPopularMovies,
    fetchTopRatedMovies
} from "../features/movieSlice.js";

const HomePage = () => {
    const dispatch = useDispatch();

    const { new: newMovies, popular: popularMovies, topRated: topRatedMovies, loading, error } = useSelector((state) => state.movie);




    // fetch movies từ redux
    useEffect(() => {
        dispatch(fetchNewMovies());
        dispatch(fetchPopularMovies());
        dispatch(fetchTopRatedMovies());
    }, [dispatch]);



    if (loading) return <p>Đang tải phim...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
      <div className="p-6 bg-[#131314] text-white">
          <MovieList
            movies={topRatedMovies}

          />
          <div className="flex">
              <div className="w-5/7">
                  <MovieCategory
                    title="MỚI NHẤT"
                    movies={newMovies}

                  />
                  <MovieCategory
                    title="XEM NHIỀU NHẤT"
                    movies={popularMovies}

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
