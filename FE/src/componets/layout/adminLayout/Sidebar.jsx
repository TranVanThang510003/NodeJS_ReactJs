import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faFilm,
    faListUl,
    faCirclePlay,
    faUsers,
    faStar,
    faRightFromBracket,
    faCircleQuestion,
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../common/Logo.jsx";

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: faHome, path: "/dashboard" },
        { name: "Manage Movies", icon: faFilm, path: "/dashboard/movies" },
        { name: "Manage Users", icon: faUsers, path: "/dashboard/users" },
        { name: "Manage Reviews", icon: faStar, path: "/dashboard/reviews" },
    ];

    const handleNavigation = (path, name) => {
        setActiveItem(name);
        navigate(path);
    };

    return (
        <div className="w-72 h-screen p-6 flex flex-col justify-between bg-gray-900">
            <div>
                {/* Logo */}
                <div className="flex items-center cursor-pointer py-2" onClick={() => navigate("/")}>
                    <div className="flex items-center gap-3">
                        <Logo width={50} height={50}/>
                    </div>

                </div>

                {/* Navigation */}
                <nav className="mt-5">
                    <ul>
                    {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`flex items-center text-gray-300 p-3 mt-2 rounded-lg cursor-pointer transition 
                                    ${activeItem === item.name ? "bg-[#f6500] shadow font-semibold" : "hover:bg-[#ff6500]"}`}
                                onClick={() => handleNavigation(item.path, item.name)}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className={`text-[#ff6500] ${activeItem === item.name ? "font-bold" : ""}`}
                                />
                                <span className="ml-3">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Account Section */}
                <h2 className="mt-6 font-semibold text-gray-600">ACCOUNT</h2>
                <ul>
                    <li
                        className="flex items-center p-3 mt-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                        onClick={() => handleNavigation("/login")}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} className="text-[#ff6500]" />
                        <span className="ml-3 text-gray-300">Log out</span>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;
