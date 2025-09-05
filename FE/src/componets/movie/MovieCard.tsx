import { useNavigate } from "react-router-dom";
import FavoriteButton from "../common/FavoriteButton";

import type {Movie} from "../../types/movie"
type Movies = Pick<Movie, "_id" | "poster" | "title" | "averageRating"|"episodes">;
interface MovieCardProps {
  movie: Movies;
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  if (!movie) return null;

  const handleCardClick = () => {
    navigate(`/phim/${movie._id}`);
  };
const latestEpisode = movie.episodes?.length
    ? movie.episodes.reduce((latest, ep) =>
        new Date(ep.releaseTime) > new Date(latest.releaseTime) ? ep : latest
    )
    : null;

  return (
      <div
          className="relative w-45 h-72 mt-2 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={handleCardClick}
      >
        <img
            src={movie.poster ?? "/placeholder.jpg"}
            alt={movie.title}
            className="w-full h-full object-cover"
        />

        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <span className="text-yellow-400">★</span> {movie.averageRating}
        </div>

        <div className="absolute top-2 right-2">
          <FavoriteButton movieId={movie._id} />
        </div>

        <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-70 text-white p-2 text-center">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          {latestEpisode ? (
              <p className="text-sm font-semibold  text-yellow-400">
                Tập  {latestEpisode.episodeNumber}
              </p>
          ) : (
              <p className="text-sm font-semibold  text-gray-400">
                Chưa phát hành
              </p>
          )}

          {/*{movie.stats && <p className="text-xs text-yellow-400">{movie.stats}</p>}*/}
        </div>
      </div>
  );
};

export default MovieCard;
