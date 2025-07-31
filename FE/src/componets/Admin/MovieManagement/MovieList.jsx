import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockMovies = [
    {
        id: 1,
        title: "The Matrix",
        genre: "Sci-Fi",
        releaseDate: "1999-03-31",
        status: "Published",
    },
    {
        id: 2,
        title: "Inception",
        genre: "Action",
        releaseDate: "2010-07-16",
        status: "Draft",
    },
];

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Thay bằng gọi API thật nếu có
        setMovies(mockMovies);
    }, []);

    const handleEdit = (id) => {
        navigate(`/dashboard/movies/edit/${id}`);
    };
    const handleView=()=>{
        navigate(`/episode-list`);
    }
    const handleDelete = (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xoá phim này?");
        if (confirmed) {
            setMovies(prev => prev.filter(movie => movie.id !== id));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh sách phim</h1>

            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="p-4">Tên phim</th>
                    <th className="p-4">Thể loại</th>
                    <th className="p-4">Ngày phát hành</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-center">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {movies.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="p-4 text-center text-gray-500">
                            Không có phim nào.
                        </td>
                    </tr>
                ) : (
                    movies.map((movie) => (
                        <tr key={movie.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{movie.title}</td>
                            <td className="p-4">{movie.genre}</td>
                            <td className="p-4">{movie.releaseDate}</td>
                            <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            movie.status === "Published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {movie.status}
                                    </span>
                            </td>
                            <td className="p-4 flex justify-center gap-3">
                                <button
                                    onClick={() => handleView(movie.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Xem
                                </button>
                                <button
                                    onClick={() => handleEdit(movie.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(movie.id)}
                                    className="text-red-600 hover:underline"
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
    );
};

export default MovieList;
