import React from "react";
import MovieCard from "./MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";


interface MovieCategoryProps {
  title: string;
  movies: Movie[];
}

const MovieCategory: React.FC<MovieCategoryProps> = ({ title, movies }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFilterPage = location.pathname === "/filter";
  const isFavoritePage = location.pathname === "/favorite-list";

  const getFilterParams = () => {
    switch (title) {
      case "MỚI NHẤT":
        return { sortBy: "latestEpisodeDate", sortOrder: "desc" };
      case "XEM NHIỀU NHẤT":
        return { sortBy: "totalViews", sortOrder: "desc" };
      default:
        return {};
    }
  };

  const handleSeeMore = () => {
    const params = new URLSearchParams(getFilterParams()).toString();
    navigate(`/filter?${params}`);
  };

  if (!movies?.length) return null;

  return (
      <div className="mb-6 relative mt-4">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="flex flex-wrap space-x-2 overflow-x-auto scrollbar-hide">
          {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        {!isFilterPage && !isFavoritePage && (
            <div className="w-full mt-2 flex justify-end">
              <div
                  className="text-orange-500 flex px-4 py-2 cursor-pointer items-center space-x-1 mr-8 hover:text-orange-700 transition duration-300"
                  onClick={handleSeeMore}
              >
                <FontAwesomeIcon icon={faArrowRight} />
                <span>Xem thêm</span>
              </div>
            </div>
        )}
      </div>
  );
};

export default MovieCategory;
