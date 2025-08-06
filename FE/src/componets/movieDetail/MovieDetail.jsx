import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailCard from "./MovieDetailCard.jsx";
import TopRankings from "../movie/TopRanking.jsx";
import EpisodeList from "./EpisodesList.jsx";
import { getEpisodeByMovieId } from "../../util/api.js";


const MovieDetail = () => {
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const { movieId } = useParams();

    // Gọi API để lấy danh sách tập phim theo movieId
    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const res = await getEpisodeByMovieId(movieId);
                setEpisodes(res.episodes || []);
                console.log(res.episodes)
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tập phim:", error);
            }
        };

        if (movieId) {
            fetchEpisodes();
        }
    }, [movieId]);

    return (
        <div className="p-6 text-white">
            <div className="flex space-x-2">
                {/* Cột trái: Thông tin phim và danh sách tập */}
                <div className="w-5/7">
                    <MovieDetailCard setSelectedEpisode={setSelectedEpisode} />
                    <EpisodeList
                        episodes={episodes}
                        selectedEpisode={selectedEpisode}
                        setSelectedEpisode={setSelectedEpisode}
                    />
                </div>

                {/* Cột phải: BXH */}
                <div className="w-2/7">
                    <TopRankings />
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
