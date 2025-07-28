import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    HeartOutlined,
    AppstoreOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Menu, Select, Space } from 'antd';
import Logo from '../common/Logo.jsx';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NAVIGATION_PATHS = {
    home: '/',
    user: '/user',
    login: '/login',
    register: '/register',
    logout: '/login',
    cart: '/cart',
    wishlist: '/wishlist',
};

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
    const [user, setUser] = useState({ name: 'User' });
    const [cartCount, setCartCount] = useState(2);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('accessToken'));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate(NAVIGATION_PATHS.logout);
    };
    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            handleLogout();
        } else {
            navigate(NAVIGATION_PATHS[key] || '/');
        }
    };

    const handleSearch = (value) => {
        console.log('Search:', value);
        setSearchValue(''); // Reset input after search
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchValue);
        }
    };

    const handleButtonClick = () => {
        handleSearch(searchValue);
    };



    const userMenu = [
        { label: 'Đăng xuất', key: 'logout', icon: <LogoutOutlined /> },
    ];

    return (
        <div className="flex fixed  w-full items-center justify-between px-6 py-3 gap-6 bg-black shadow h-[80px] z-[1000]">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <Logo width={50} height={50}/>
            </div>

            {/* Search Box */}
            <div className="w-[30%]">
                <div className="relative">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder="  Tìm kiếm sản phẩm..."
                        className="w-full h-[48px] px-4 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                    />
                    <button
                        onClick={handleButtonClick}
                        className="absolute right-0 top-0 h-[48px] w-[60px] bg-[#febd69] text-black rounded-r-md hover:bg-orange-400 active:bg-orange-500 transition-colors flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
            </div>



            <div className="flex items-center gap-6">


                {/* Avatar hoặc Auth */}
                {isLoggedIn ? (
                    <Dropdown menu={{items: userMenu, onClick: handleMenuClick}} placement="bottomRight" arrow>
                        <Space className="cursor-pointer">
                            <span>{user.name}</span>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Space>
                    </Dropdown>
                ) : (
                    <div className="flex items-center ">
                    <span
                        className={`${styles.authButton} ${styles.register}`}
                        onClick={() => navigate(NAVIGATION_PATHS.register)}
                    >
                        Đăng ký
                    </span>
                        <span
                            className={`${styles.authButton} ${styles.login}`}
                            onClick={() => navigate(NAVIGATION_PATHS.login)}
                        >
                        Đăng nhập
                    </span>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Header;