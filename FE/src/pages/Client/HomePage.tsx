import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MovieList from "../../componets/Movie/MovieList";
import MovieCategory from "../../componets/Movie/MovieCategory";
import TopRankings from "../../componets/Movie/TopRanking";
import type { RootState, AppDispatch } from "../../redux/store";
import {
    fetchNewMovies,
    fetchPopularMovies,
    fetchTopRatedMovies
} from "../../features/movieSlice";
import {fetchFavorites} from "../../features/favoriteSlice";
import RecommendedMovieList from "../../componets/Movie/RecommendedMovieList";

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { new: newMovies, popular: popularMovies, topRated: topRatedMovies, loading, error } =
        useSelector((state: RootState) => state.movie);

    // fetch movies từ redux
    useEffect(() => {
        dispatch(fetchNewMovies());
        dispatch(fetchPopularMovies());
        dispatch(fetchTopRatedMovies());
        if (localStorage.getItem("accessToken")) {
            dispatch(fetchFavorites());
        }
    }, [dispatch]);



    if (loading) return <p>Đang tải phim...</p>;


    return (
        <div className="p-6 bg-[#131314] text-white">
            {/*<MovieList*/}
            {/*    movies={topRatedMovies}*/}

            {/*/>*/}
            <RecommendedMovieList/>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-5/7">
                    <MovieCategory title="MỚI NHẤT" movies={newMovies}/>
                    <MovieCategory title="XEM NHIỀU NHẤT" movies={popularMovies}/>
                </div>
                <div className="w-full lg:w-2/7 mt-6 lg:mt-0">
                    <TopRankings/>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
