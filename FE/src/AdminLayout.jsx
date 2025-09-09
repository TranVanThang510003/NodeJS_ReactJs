import React from "react";
import Sidebar from "./componets/layout/AdminLayout/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
    return (
        <div className="flex h-screen   ">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                {/*<Header />*/}

                {/* Content */}
                <main className="flex-1 p-6 overflow-auto bg-gray-50 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default LayoutAdmin;