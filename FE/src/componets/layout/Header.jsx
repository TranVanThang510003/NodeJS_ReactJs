import React, { useState } from 'react';
import { SmileOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
const Header = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
        switch (e.key) {
            case 'home':
                navigate('/');
                break;
            case 'user':
                navigate('/user');
                break;
            case 'login':
                navigate('/login');
                break;
            case 'register':
                navigate('/register');
                break;
            default:
                break;
        }
    };

    const items = [
        {
            label: 'Homepage',
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: 'Users',
            key: 'user',
            icon: <UserOutlined />,
        },
        {
            label: 'Welcome',
            key: 'welcome',
            icon: <SmileOutlined />,
            children: [
                { label: 'Log In', key: 'login' },
                { label: 'Sign Up', key: 'register' },
            ],
        },
    ];

    return (
        <div className="flex items-center px-4 py-2 bg-white shadow">
            {/* Logo bên trái */}
            <Logo width={50} height={50} />

            {/* Menu bên phải */}
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                style={{ flex: 1, justifyContent: 'flex-start',marginLeft:'20px',  borderBottom: 'none' }}
            />
        </div>
    );
};

export default Header;
