
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = ({ width = 60, height = 60, className = '' }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`flex items-center cursor-pointer ${className}`}
            onClick={() => navigate('/')}
        >
            <img
                src="/img/logo.png"
                alt="QuickCart Logo"
                style={{width, height}}
                className="object-contain"
            />
            <span className="hidden md:inline ml-2 text-gray-500 text-2xl font-bold drop-shadow">
                 AStream
            </span>

        </div>
    );
};

export default Logo;
