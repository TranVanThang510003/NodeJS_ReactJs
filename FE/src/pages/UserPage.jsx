import React, {useEffect, useState} from 'react';
import {notification, Space, Table, Tag} from 'antd';
import {getUserApi} from "../util/api.ts";

const UserPage = () =>{
const [userData, setUserData] = useState([]);

useEffect(()=>{

const fetchUser = async () => {
    try {
            const res = await getUserApi(); // nếu lỗi, sẽ nhảy vào catch
            setUserData(res);
        } catch (err) {
            notification.error({
                message: "Lỗi",
                description: err.message || "Không thể lấy dữ liệu người dùng.",
            });
        }
    }
      fetchUser();
},[])
const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',

    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
    return(
        <Table columns={columns} dataSource={userData} rowKey="_id" />

        )
}
export default UserPage;