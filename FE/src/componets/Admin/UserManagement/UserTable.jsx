

import { useUsers } from '../../../hook/useUsers.js'
import CommonTable from '../Common/CommonTable.jsx'
import { Tag, Space } from "antd";
const columns = [
  {
    title: 'No.',
    fixed: 'left',
    render: (_, __, index) => <span >{index+1}</span>,
  },
  {
    title: 'ID',
    dataIndex: '_id',
    fixed: 'left',
    render: (id) => <span className="text-gray-500">{id.slice(0, 6)}...</span>,
  },
  {
    title: 'Full Name',
    dataIndex: 'name',
    fixed: 'left',
    render: text => <span className="font-medium text-blue-600">{text}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: email => <span className="text-gray-700">{email}</span>,
  },

  {
    title: 'role',
    dataIndex: 'role',
    render: (role) => {
      let color = role === 'admin' ? 'red' : 'green';
      return <Tag color={color} className="px-2 py-1 rounded">{role.toUpperCase()}</Tag>;
    },
  },
  {
    title: 'Action',
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">
          View
        </button>
        <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
          Edit
        </button>
        <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
          Delete
        </button>
      </Space>
    ),
  },
];

const UserTable = () => {
  const { users, loading, error } = useUsers()

  return (
    <CommonTable
      columns={columns}
      dataSource={users}
      loading={loading}
      error={error}
      rowKey="_id"
      pagination={{ pageSize: 15 }}
    />

  );
};
export default UserTable;