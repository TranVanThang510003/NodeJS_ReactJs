import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailCard from "./MovieDetailCard.jsx";
import TopRankings from "../movie/TopRanking.jsx";
import EpisodeList from "./EpisodesList.jsx";
import { getEpisodeByMovieId } from "../../util/api.js";

// Dữ liệu mẫu cho phim mới
const newMovies = [
    {
        image: '/img/TM.jpg',
        rating: '9.5',
        title: 'Trong Tông Môn Trù...',
        stats: '68 VS + 84 TM',
    },
    {
        image: '/img/TN.jpeg',
        rating: '8.7',
        title: 'Naruto Shippuden',
        stats: 'Full 500 VS',
    },
    {
        image: '/img/D.jpg',
        rating: '9.5',
        title: 'Doraemon',
        stats: '873 VS + 500 TM',
    },
    {
        image: '/img/LD.jpg',
        rating: '9.5',
        title: 'Tiểu Tiên Chi Đạo...',
        stats: '32 VS + 28 TM',
    },
    {
        image: '/img/VT.jpg',
        rating: '9.5',
        title: 'Vô Thượng Thần Đế',
        stats: '04 VS + 02 TM',
    },
];

// Dữ liệu mẫu cho phim phổ biến
const popularMovies = [
    {
        image: '/img/TN.jpeg',
        rating: '9.5',
        title: 'Everyone in The Sect, Ex...',
        stats: '137 VS + 1128 TM',
    },
    {
        image: '/img/TN.jpeg',
        rating: '8.7',
        title: 'Naruto Shippuden',
        stats: 'Full 500 VS',
    },
    {
        image: '/img/TM.jpg',
        rating: '9.5',
        title: 'Trong Tông Môn Trù...',
        stats: '68 VS + 84 TM',
    },
    {
        image: '/img/D.jpg',
        rating: '9.5',
        title: 'Doraemon',
        stats: '873 VS + 500 TM',
    },
    {
        image: '/img/LD.jpg',
        rating: '9.5',
        title: 'Tiểu Tiên Chi Đạo...',
        stats: '32 VS + 28 TM',
    },
];

// BXH top phim
const topRankedMovies = [
    ...popularMovies,
    ...newMovies.slice(0, 3),
];

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
                    <TopRankings movies={topRankedMovies} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
