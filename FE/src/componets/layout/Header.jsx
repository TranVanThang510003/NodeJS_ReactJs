import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import Logo from "../common/Logo.tsx";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import FilterBar from "../common/FilterBar.tsx";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice.js"; // <-- slice auth bạn đã viết
import { fetchFavorites } from "../../features/favoriteSlice.js"; // <-- slice favorite bạn đã viết

const NAVIGATION_PATHS = {
    home: "/",
    user: "/user",
    login: "/login",
    register: "/register",
    logout: "/login",
    cart: "/cart",
    favoritList: "/favorite-list",
};

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // lấy dữ liệu từ Redux store
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { items: favorites } = useSelector((state) => state.favorite);

    const [searchValue, setSearchValue] = useState("");

    // khi login thì fetch favorites
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchFavorites());
        }
    }, [isLoggedIn, dispatch]);

    const handleLogout = () => {
        dispatch(logout()); // clear Redux + localStorage
        navigate(NAVIGATION_PATHS.logout);
    };

    const handleMenuClick = ({ key }) => {
        if (key === "logout") {
            handleLogout();
        } else if (key === "profile") {
            navigate("/user/me");
        } else {
            navigate(NAVIGATION_PATHS[key] || "/");
        }
    };

    const handleSearch = (value) => {
        navigate(`/filter?name=${encodeURIComponent(value)}`);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch(searchValue);
        }
    };

    const handleButtonClick = () => {
        handleSearch(searchValue);
    };

    const userMenu = [
        { label: "Hồ sơ cá nhân", key: "profile", icon: <UserOutlined /> },
        { type: "divider" },
        { label: "Đăng xuất", key: "logout", icon: <LogoutOutlined /> },

    ];

    return (
      <div className="flex fixed  w-full items-center justify-between px-6 py-3 gap-6 bg-black shadow h-[80px] z-[1000]">
          {/* Logo + Filter */}
          <div className="flex items-center gap-6">
              <Logo width={50} height={50} />
              <FilterBar onFilterChange={(filters) => console.log("Bộ lọc:", filters)} />
          </div>

          {/* Search Box */}
          <div className="w-[30%]">
              <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="  Tìm kiếm theo tên..."
                    className="w-full h-[48px] px-4 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                  />
                  <button
                    onClick={handleButtonClick}
                    className="absolute right-0 top-0 h-[48px] w-[60px] bg-[#febd69] text-black rounded-r-md hover:bg-orange-400 active:bg-orange-500 transition-colors flex items-center justify-center"
                  >
                      <FontAwesomeIcon icon={faSearch} />
                  </button>
              </div>
          </div>

          <div className="flex items-center gap-6">
              {/* Avatar hoặc Auth */}
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    {/* icon Favorite có badge */}
                    <div className="relative cursor-pointer" onClick={() => navigate(NAVIGATION_PATHS.favoritList)}>
                        <FaHeart
                          size={25}
                          className="text-orange-500 transition-transform duration-300 transform hover:scale-125"
                        />
                        {favorites.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
                        )}
                    </div>

                    <Dropdown
                      menu={{ items: userMenu, onClick: handleMenuClick }}
                      placement="bottomRight"
                      arrow
                    >
                        <Space className="cursor-pointer">
                            <span>{user?.name || 'User'}</span>
                            <div
                              className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                                {user?.name.charAt(0)}
                            </div>
                        </Space>
                    </Dropdown>

                </div>
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
