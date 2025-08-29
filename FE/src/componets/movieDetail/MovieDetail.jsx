import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, toggleFavorite } from "../../features/favoriteSlice.js";
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEpisodeByMovieId } from '../../util/api.ts'
import MovieDetailCard from './MovieDetailCard.jsx'
import EpisodeList from './EpisodesList.jsx'
import CommentSection from './CommentSection.jsx'
import TopRankings from '../movie/TopRanking.jsx'


const MovieDetail = () => {
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorite);

    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        dispatch(fetchFavorites()); // load favorites khi vào
    }, [dispatch]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const res = await getEpisodeByMovieId(movieId);
                setEpisodes(res.episodes || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tập phim:", error);
            }
        };

        if (movieId) fetchEpisodes();
    }, [movieId]);

    return (
      <div className="p-6 text-white">
          <div className="flex space-x-2">
              <div className="w-5/7">
                  <MovieDetailCard
                    setSelectedEpisode={setSelectedEpisode}
                    favorites={favorites}
                    toggleFavorite={(id) => dispatch(toggleFavorite(id))}
                  />
                  <EpisodeList
                    episodes={episodes}
                    selectedEpisode={selectedEpisode}
                    setSelectedEpisode={setSelectedEpisode}
                  />
                  <CommentSection />
              </div>

              <div className="w-2/7">
                  <TopRankings />
              </div>
          </div>
      </div>
    );
};

export default MovieDetail;
