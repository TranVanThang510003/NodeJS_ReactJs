import React, { useEffect, useState } from "react";
import {getWatchedMovies} from "../../util/api";
import MovieCategory from "../../componets/Movie/MovieCategory";
import type {Movie} from "../../types/movie";
import {message} from "antd";
const HistoryPage = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 15;
    const [data, setData] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>();
    useEffect(() => {
       const fetchHistory =async ()=>{
           try {
               setLoading(true);
               const response = await getWatchedMovies();
               setData(response.data.data);
               console.log(response);
           }catch (err: any){
               console.log(err);
               message.error(err.message||'Lỗi chưa xác định');
           }finally {
               setLoading(false);
           }
        }
        fetchHistory()
    }, []);

    const totalPages = data.length
        ? Math.ceil(data.length / itemsPerPage)
        : 1;

    const paginatedMovies = data.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    if (loading) return <p>Đang tải phim...</p>;
    return (
        <div className="p-6 text-white">
        <h2 className="inline-flex items-center px-4 py-2 mt-4 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg">
            Danh Sách Phim đã xem
    </h2>

    <MovieCategory
    title=""
    movies={paginatedMovies}
    />

    {/* Pagination */}
    <div className="flex justify-center space-x-2 mt-6">
    <button
        onClick={() => setPage(1)}
    disabled={page === 1}
    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
        Trang đầu
    </button>
    <button
    onClick={() => setPage((p) => Math.max(p - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
        &lt;
            </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                    key={i}
    onClick={() => setPage(i + 1)}
    className={`px-4 py-2 rounded ${
        page === i + 1
            ? "bg-orange-500"
            : "bg-gray-700 hover:bg-gray-600"
    }`}
>
    {i + 1}
    </button>
))}

    <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
    disabled={page === totalPages}
    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
        &gt;
        </button>
        <button
    onClick={() => setPage(totalPages)}
    disabled={page === totalPages}
    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
        Trang cuối
    </button>
    </div>
    </div>
);
};

export default HistoryPage;
