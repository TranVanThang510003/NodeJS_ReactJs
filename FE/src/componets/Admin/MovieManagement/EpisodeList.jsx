import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateEpisode from "./CreateEpisode.jsx"
const EpisodeList = () => {
    const { movieId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const navigate = useNavigate();
    const {id}=useParams()
    // Gọi API khi component mount
    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const res = await axios.get(`/api/movies/${id}`);
                setEpisodes(res.episodes || []);

            } catch (error) {
                console.error("Lỗi khi lấy tập phim:", error);
            }
        };

        fetchEpisodes();
    }, [movieId]);

    const handleEdit = (episodeId) => {
        navigate(`/dashboard/movies/${movieId}/episodes/edit/${episodeId}`);
    };

    const handleDelete = async (episodeId) => {
        const confirmed = window.confirm("Bạn có chắc muốn xoá tập phim này?");
        if (!confirmed) return;

        try {
            await axios.delete(`/api/episodes/${episodeId}`);
            setEpisodes((prev) => prev.filter((e) => e.id !== episodeId));
        } catch (error) {
            console.error("Lỗi khi xoá:", error);
        }
    };


    const [showForm, setShowForm] = useState(false);

    const handleAdd = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Danh sách tập phim</h1>
                    <button
                        onClick={handleAdd}
                        className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md transition"
                    >
                        + Thêm tập phim
                    </button>
                </div>
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
                            <button
                                onClick={handleCloseForm}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black p-2 text-3xl"
                            >
                                ×
                            </button>
                            <CreateEpisode />
                        </div>
                    </div>
                )}

                {episodes.length === 0 ? (
                    <p className="text-gray-400 text-center">Chưa có tập phim nào.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 text-gray-200 lg:grid-cols-3 gap-6">
                        {episodes.map((ep) => (
                            <div
                                key={ep.id}
                                className="bg-[#1c1c1e] border border-gray-700 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                            >
                                <h2 className="text-xl font-semibold mb-2">{ep.title}</h2>
                                <p className="text-gray-400 mb-1">
                                    <span className="text-gray-300 font-medium">Ngày phát hành:</span>{" "}
                                    {ep.releaseDate}
                                </p>
                                <p className="mb-3">
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            ep.status === "Published"
                                                ? "bg-green-700/30 text-green-300"
                                                : "bg-yellow-700/30 text-yellow-300"
                                        }`}
                                    >
                                        {ep.status === "Published" ? "Đã phát hành" : "Chờ phát hành"}
                                    </span>
                                </p>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => handleEdit(ep.id)}
                                        className="text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ep.id)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Xoá
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default EpisodeList;