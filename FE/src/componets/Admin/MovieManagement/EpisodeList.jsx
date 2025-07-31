import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockEpisodes = [
    {
        id: 1,
        title: "Tập 1: Thức tỉnh",
        releaseDate: "2025-08-01",
        status: "Published",
    },
    {
        id: 2,
        title: "Tập 2: Xâm nhập",
        releaseDate: "2025-08-08",
        status: "Scheduled",
    },
];

const EpisodeList = () => {
    const { movieId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Thay bằng gọi API thật theo movieId nếu có
        setEpisodes(mockEpisodes);
    }, [movieId]);

    const handleEdit = (episodeId) => {
        navigate(`/dashboard/movies/${movieId}/episodes/edit/${episodeId}`);
    };

    const handleDelete = (episodeId) => {
        const confirmed = window.confirm("Bạn có chắc muốn xoá tập phim này?");
        if (confirmed) {
            setEpisodes((prev) => prev.filter((e) => e.id !== episodeId));
        }
    };

    const handleAdd = () => {
        navigate(`/dashboard/movies/${movieId}/episodes/create`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Danh sách tập phim</h1>
            <button
                onClick={handleAdd}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                + Thêm tập phim
            </button>

            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="p-4">Tên tập</th>
                    <th className="p-4">Ngày phát hành</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-center">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {episodes.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="p-4 text-center text-gray-500">
                            Chưa có tập phim nào.
                        </td>
                    </tr>
                ) : (
                    episodes.map((ep) => (
                        <tr key={ep.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{ep.title}</td>
                            <td className="p-4">{ep.releaseDate}</td>
                            <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            ep.status === "Published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {ep.status}
                                    </span>
                            </td>
                            <td className="p-4 flex justify-center gap-3">
                                <button
                                    onClick={() => handleEdit(ep.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(ep.id)}
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

export default EpisodeList;
