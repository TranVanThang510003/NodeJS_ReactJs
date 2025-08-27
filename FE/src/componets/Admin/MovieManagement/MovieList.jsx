import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getMovieApi } from "../../../util/api.ts";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMovieApi();
                setMovies(response.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)));
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError("Failed to load movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleEdit = (id) => navigate(`/dashboard/movies/edit/${id}`);
    const handleView = (id) => navigate(`/dashboard/movies/${id}`);
    const handleDelete = (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xoá phim này?");
        if (confirmed) {
            setMovies((prev) => prev.filter((movie) => movie._id !== id));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">🎬 Danh sách phim</h1>

            {loading ? (
                <p className="text-center text-gray-500">Đang tải...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
                        <tr>
                            <th className="p-4 text-left">Tên phim</th>
                            <th className="p-4 text-left">Thể loại</th>
                            <th className="p-4 text-left">Ngày phát hành</th>
                            <th className="p-4 text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">
                                    Không có phim nào.
                                </td>
                            </tr>
                        ) : (
                            movies.map((movie) => (
                                <tr
                                    key={movie._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-4">{movie.title}</td>
                                    <td className="p-4">
                                        {Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}
                                    </td>

                                    <td className="p-4">{formatDate(movie.releaseDate)}</td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <button
                                            onClick={() => handleView(movie._id)}
                                            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                                        >
                                            Xem
                                        </button>
                                        <button
                                            onClick={() => handleEdit(movie.id)}
                                            className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(movie.id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MovieList;
