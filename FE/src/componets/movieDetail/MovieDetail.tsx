
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEpisodeByMovieId } from '../../util/api'
import MovieDetailCard from './MovieDetailCard'
import EpisodeList from './EpisodesList.js'
import CommentSection from './CommentSection'
import TopRankings from '../movie/TopRanking'
import type {Episode} from "../../types/movie"


const MovieDetail = () => {
    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const { movieId } = useParams<{ movieId: string }>();


    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const res = await getEpisodeByMovieId(movieId as string);
                setEpisodes(res?.data?.episodes || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tập phim:", error);
            }
        };

        if (movieId) fetchEpisodes();
    }, [movieId]);

    return (
      <div className="p-6 text-white">
          <div className="flex flex-col  lg:flex-row space-x-2">
              <div className="w-full lg:w-5/7">
                  <MovieDetailCard
                    setSelectedEpisode={setSelectedEpisode}

                  />
                  <EpisodeList
                    episodes={episodes}
                    selectedEpisode={selectedEpisode}
                    setSelectedEpisode={setSelectedEpisode}
                  />
                  <CommentSection />
              </div>

              <div className="w-full lg:w-2/7">
                  <TopRankings />
              </div>
          </div>
      </div>
    );
};

export default MovieDetail;
