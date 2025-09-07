import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, Drawer } from "antd";
import Logo from "../common/Logo.tsx";
import FilterBar from "../common/FilterBar.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice.js";
import { fetchFavorites } from "../../features/favoriteSlice.js";

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

    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { items: favorites } = useSelector((state) => state.favorite);

    const [searchValue, setSearchValue] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchFavorites());
        }
    }, [isLoggedIn, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
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
        setIsDrawerOpen(false);
    };

    const handleInputChange = (e) => setSearchValue(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSearch(searchValue);
    };

    const handleButtonClick = () => handleSearch(searchValue);

    const userMenu = [
        { label: "Hồ sơ cá nhân", key: "profile", icon: <UserOutlined /> },
        { type: "divider" },
        { label: "Đăng xuất", key: "logout", icon: <LogoutOutlined /> },
    ];

    return (
      <div
        className="flex fixed w-full items-center px-4 md:px-6 py-3 bg-black shadow h-[70px] z-[1000] justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
              <Logo width={45} height={45}/>
              {/* FilterBar chỉ hiện ở desktop */}
              <div className="hidden lg:block">
                  <FilterBar      onFilterChange={(filters) => console.log("Bộ lọc:", filters)}/>
              </div>
          </div>

          {/* CENTER (Search box - desktop only) */}
          <div className="hidden lg:flex flex-1 justify-center min-w-0 px-4 ">
              <div className="w-full max-w-md relative bg-gray-100 rounded-lg">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Tìm kiếm theo tên..."
                    className="w-full h-[44px] px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    onClick={handleButtonClick}
                    className="absolute right-0 top-0 h-[44px] w-[50px] bg-[#febd69] text-black rounded-r-md hover:bg-orange-400 active:bg-orange-500 flex items-center justify-center"
                  >
                      <FontAwesomeIcon icon={faSearch}/>
                  </button>
              </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 flex-1 justify-end">
              {/* Mobile Search Icon */}
              <div className="lg:hidden cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
                  <FontAwesomeIcon icon={faSearch} size="lg" className="text-white"/>
              </div>

              {/* Favorite */}
              {isLoggedIn && (
                <div
                  className="relative cursor-pointer"
                  onClick={() => navigate(NAVIGATION_PATHS.favoritList)}
                >
                    <FaHeart
                      size={24}
                      className="text-orange-500 transition-transform duration-300 transform hover:scale-125"
                    />
                    {favorites.length > 0 && (
                      <span
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
                    )}
                </div>
              )}

              {/* User */}
              {isLoggedIn ? (
                <Dropdown menu={{ items: userMenu, onClick: handleMenuClick }} placement="bottomRight" arrow>
                    <Space className="cursor-pointer">
                        <span className="hidden sm:block text-white">{user?.name || "User"}</span>
                        <div
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-blue-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
                            {user?.name?.charAt(0)}
                        </div>
                    </Space>
                </Dropdown>
              ) : (
                <div className="flex items-center text-white gap-1 sm:gap-2 md:gap-3 lg:gap-3">
                    <span
                      onClick={() => navigate(NAVIGATION_PATHS.register)}
                      className="
                        bg-orange-600 text-white
                        px-3 py-1 rounded-md
                        w-[110px] h-[34px] flex justify-center items-center
                        font-medium text-[14px] cursor-pointer mr-2
                        transition-colors duration-300
                        hover:bg-orange-500
                        sm:w-[110px] sm:h-[36px] sm:text-[15px]
                        md:w-[130px] md:h-[40px] md:text-[16px]
                        lg:w-[140px] lg:h-[44px] lg:text-[18px]
                      "
                    >
                      Đăng ký
                    </span>

                    <span
                      onClick={() => navigate(NAVIGATION_PATHS.login)}
                      className="
                       bg-orange-600 text-white
                        px-3 py-1 rounded-md
                        w-[110px] h-[34px] flex justify-center items-center
                        font-medium text-[14px] cursor-pointer
                        transition-colors duration-300
                        hover:bg-orange-500
                        sm:w-[110px] sm:h-[36px] sm:text-[15px]
                        md:w-[130px] md:h-[40px] md:text-[16px]
                        lg:w-[140px] lg:h-[44px] lg:text-[18px]
                      "
                    >
                      Đăng nhập
                    </span>


                </div>
              )}

              {/* Mobile menu icon */}
              <div className="lg:hidden cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
                  <MenuOutlined style={{ fontSize: '20px', color: 'white' }}/>
              </div>
          </div>

          {/* Drawer cho mobile (search + filter) */}
          <Drawer
            title="Filter"
            placement="right"
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
          >
              {/* Search box */}
              <div className="mb-4">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Tìm kiếm..."
                    className="w-full h-[40px] px-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    onClick={handleButtonClick}
                    className="mt-2 w-full h-[40px] bg-[#febd69] text-black rounded-md hover:bg-orange-400 active:bg-orange-500"
                  >
                      Tìm kiếm
                  </button>
              </div>

              {/* FilterBar */}
              <FilterBar setIsDrawerOpen={setIsDrawerOpen} onFilterChange={(filters) => console.log("Bộ lọc:", filters)}/>
          </Drawer>
      </div>
    );
};

export default Header;
