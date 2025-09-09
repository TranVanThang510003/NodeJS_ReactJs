import React, { useEffect, useState } from 'react';
import { notification, Space, Table, Tag } from 'antd';
import { getUserApi } from "../../util/api.ts";

const UserPage = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserApi();
                setUserData(res.data);
            } catch (err) {
                notification.error({
                    message: "Lỗi",
                    description: err.message || "Không thể lấy dữ liệu người dùng.",
                });
            }
        };
        fetchUser();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (id) => <span className="text-gray-500">{id.slice(0, 6)}...</span>, // rút gọn ID
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <span className="font-medium text-blue-600">{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: email => <span className="text-gray-700">{email}</span>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role) => {
                let color = role === 'admin' ? 'red' : 'green';
                return <Tag color={color} className="px-2 py-1 rounded">{role.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                  <a className="text-blue-500 hover:underline">Edit</a>
                  <a className="text-red-500 hover:underline">Delete</a>
              </Space>
            ),
        },
    ];

    return (
      <div className="flex flex-col gap-6   min-h-screen">
          <div className="text-3xl font-semibold text-gray-800 ">
              MANAGE USERS
          </div>
          <Table
            columns={columns}
            dataSource={userData}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 10 }}
            className="bg-white shadow-md rounded-lg"
          />
      </div>
    );
};

export default UserPage;
