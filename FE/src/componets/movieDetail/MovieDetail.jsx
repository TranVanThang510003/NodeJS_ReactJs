import MovieDetailCard from "./MovieDetailCard.jsx";
import TopRankings from "../movie/TopRanking.jsx";
import EpisodeList from "./EpisodesList.jsx";
import {useState} from "react";
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
        image: '/img/TN.jpeg',
        rating: '9.5',
        title: 'Tây Hán Kỳ: Đại Vi...',
        stats: '10 VS + 03 TM',
    },
    {
        image: '/img/VT.jpg',
        rating: '9.5',
        title: 'Vô Thượng Thần Đế',
        stats: '04 VS + 02 TM',
    },
];

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

// Lấy một số phim nổi bật cho BXH (ví dụ: 5 phim đầu tiên từ popularMovies)
const topRankedMovies = [
    ...popularMovies,
    ...newMovies.slice(0, 3),
];
const MovieDetail = () => {
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    return (
        <div className="p-6 text-white">
            <div className="flex space-x-2 ">
                <div className="w-5/7">
                    <MovieDetailCard setSelectedEpisode={setSelectedEpisode} />
                    <EpisodeList selectedEpisode={selectedEpisode} setSelectedEpisode={setSelectedEpisode} />
                </div>
                <div className="w-2/7">
                    <TopRankings movies={topRankedMovies} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;