import React, { useEffect, useState } from "react";
import { Flex, message, Rate } from "antd";
import "../../style/global.css";
import { getMovieByIdApi, rating } from "../../util/api";
import { useParams } from "react-router-dom";
import FavoriteButton from "../common/FavoriteButton";
import type { Movie } from "../../types/movie";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

interface MovieDetailProps {
    setSelectedEpisode: React.Dispatch<React.SetStateAction<number | null>>;
}

const MovieDetailCard: React.FC<MovieDetailProps> = ({ setSelectedEpisode }) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const { movieId } = useParams<{ movieId: string }>();
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMovieByIdApi(movieId as string);
            setMovie(response.data);
        };
        fetchData();
    }, [movieId]);

    const year =
        movie?.releaseDate ? new Date(movie.releaseDate).getFullYear() : "";

    const handleWatchClick = () => {
        setSelectedEpisode(1); // Mở tập 1
    };

    const handleRatingChange = async (value: number) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            message.warning("Vui lòng đăng nhập để đánh giá phim");
            return;
        }

        try {
            setValue(value);
            const res = await rating(movieId as string, value);
            if (res?.data?.success) {
                message.success(res.data.message || "Đánh giá thành công");
            } else {
                message.error("Đánh giá thất bại");
            }
        } catch (err) {
            console.error(err);
            message.error("Có lỗi khi đánh giá phim");
        }
    };

    // Loading state
    if (!movie) {
        return <div className="text-white">Đang tải...</div>;
    }

    return (
        <div className="flex justify-center items-center">
            <div
                className="p-4 rounded-lg flex flex-col items-center lg:flex-row  lg:items-start  w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <img
                        src={movie.poster}
                        alt="img"
                        className="w-60 h-80 object-cover rounded-md"
                    />
                    <button
                        className="bg-red-700 text-white px-4 py-4 rounded hover:bg-red-600 absolute bottom-0 w-full opacity-80"
                        onClick={handleWatchClick}
                    >
                        XEM PHIM
                    </button>
                </div>
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                    <p className="text-gray-300 mb-2">
                        {movie.genres?.length ? movie.genres.join(", ") : "Chưa rõ"}
                    </p>
                    <p className="text-gray-400 mb-4">
                        {movie.country} | {year}
                    </p>
                    <p className="text-gray-300 text-sm mb-4 h-32 overflow-y-auto pr-2">
                        {movie.description}
                    </p>

                    <Flex gap="middle" align="center">
                        <div className="flex flex-col sm:flex-row justify-between">
                            <Rate
                                className="custom-rate"
                                allowHalf
                                tooltips={desc}
                                onChange={handleRatingChange}
                                value={value}
                            />
                            <div className="text-yellow-500 font-semibold text-lg lg:ml-2">
                                {movie.averageRating} / 5 ({movie.ratingCount} đánh giá)
                            </div>
                        </div>
                        <div className=" ml-20 lg:ml-40 ">
                            {movieId && <FavoriteButton movieId={movieId} />}
                        </div>
                    </Flex>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailCard;
