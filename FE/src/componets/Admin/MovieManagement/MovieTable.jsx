
import {useNavigate} from "react-router-dom";
import {useMovies} from '../../../hook/useMovies.ts'
import CommonTable from '../Common/CommonTable.jsx'
import {Space} from 'antd'

const MovieTable = () => {

   const {movies,loading,error}= useMovies()
   const navigate = useNavigate();
    const handleEdit = (id) => navigate(`/dashboard/movies/edit/${id}`);
    const handleView = (id) => navigate(`/admin/movies/${id}`);
    const handleDelete = () => {
       window.confirm("Bạn có chắc muốn xoá phim này?");

    };

  const columns = [
    {
      title: 'No .',
      width: 80,
      fixed: 'left',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên phim',
      dataIndex: 'title',
      fixed: 'left',
      ellipsis: true,
      width: 250,
      render: (text) => (
        <span className="font-medium text-blue-600">{text}</span>
      ),
    },
    {
      title: 'Thể loại',
      dataIndex: 'genres',
      ellipsis: true,
      width: 150,
      render: (genres) =>
        Array.isArray(genres) ? genres.join(', ') : genres,
    },
    {
      title: 'Ngày phát hành',
      dataIndex: 'releaseDate',
      ellipsis: true,
      width: 150,
      render: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleView(record._id)}
            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(record._id)}
            className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];


  return (
          <CommonTable
            columns={columns}
            dataSource={movies}
            rowKey="_id"
            loading={loading}
            error={error}
            pagination={{ pageSize: 15 }}
            className="bg-white shadow-md rounded-lg"
          />
    );
};

export default MovieTable;
