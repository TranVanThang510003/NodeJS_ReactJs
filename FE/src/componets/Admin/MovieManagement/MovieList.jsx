
import { getMovieApi } from "../../../util/api.ts";
import React, { useEffect, useState } from 'react';
import { notification, Space, Table, Tag } from 'antd';
import {useNavigate} from "react-router-dom";
const UserPage = () => {
    const [movies, setMovies] = useState([]);
   const navigate = useNavigate();


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMovieApi();
                setMovies(response.data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)));
                console.log(response.data);
            } catch (err) {
                notification.error({
                    message: "Lỗi",
                    description: err.message || "Không thể lấy dữ liệu người dùng.",
                });
            }
        };

        fetchMovies();
    }, []);
    const handleEdit = (id) => navigate(`/dashboard/movies/edit/${id}`);
    const handleView = (id) => navigate(`/admin/movies/${id}`);
    const handleDelete = (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xoá phim này?");
        if (confirmed) {
            setMovies((prev) => prev.filter((movie) => movie._id !== id));
        }
    };
    const handleAddNew=()=>{
        navigate("/admin/movies/create-movie");
    }

    const columns = [
        {
            title: 'Tên phim',
            dataIndex: 'title',
            render: text => <span className="font-medium text-blue-600">{text}</span>,
        },
        {
            title: 'Thể loại',
            dataIndex: 'genres',
            render: (genres) => Array.isArray(genres) ? genres.join(', ') : genres,
        },
        {
            title: 'Ngày phát hành',
            dataIndex: 'releaseDate',
            render: (date) => {
                const d = new Date(date);
                return d.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
              <Space size="middle">
                  <button onClick={() => handleView(record._id)} className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">
                      Xem
                  </button>
                  <button  onClick={() => handleEdit(record._id)} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
                      Sửa
                  </button>
                  <button  onClick={() => handleDelete(record._id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                      Xoá
                  </button>
              </Space>
            ),
        },
    ];


    return (
      <div className="flex flex-col gap-6   min-h-screen">
          <div className="w-full flex justify-between ">
              <div className="text-3xl font-semibold text-gray-800 ">
                  MANAGE USERS
              </div>
              <button className="text-lg font-semibold text-white rounded-lg bg-blue-400 px-4 py-2" onClick={handleAddNew}>Add new</button>
          </div>
          <Table
            columns={columns}
            dataSource={movies}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 10 }}
            className="bg-white shadow-md rounded-lg"
          />
      </div>
    );
};

export default UserPage;
