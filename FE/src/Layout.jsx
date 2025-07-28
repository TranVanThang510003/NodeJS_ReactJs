import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./componets/layout/Header.jsx";

const Layout = () => {
    return (
        <div className='app-container min-h-screen bg-[#131314]'  >
            <div className='header-container'>
                <Header/>
            </div>
            <div className='main-container pt-14'>
                <div className='sidenav-container'>

                </div>
                <div className='app-container   '>
                    <Outlet />
                </div>
            </div>
            <div className='footer-container'>
                {/*<Footer />*/}
            </div>
        </div>
    )
}

export default Layout