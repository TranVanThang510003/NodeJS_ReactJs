import React from 'react';

const MovieDetailCard = ({ title, onClose }) => {
    // Dữ liệu mẫu, bạn có thể thay bằng props hoặc API
    const movieData = {
        image: '/img/LD.jpg',
        title: "Dũng Sĩ Otaku Béo",
        genres: "Busamen Gachi Fighter, Uglymug, Epicfighter",
        episodes: "04 VS + 02 TM",
        country: "Nhật Bản",
        year: "2025",
        description:
            "Đường Sĩ Otaku Béo kể về ông chú Shigeru Yoshioka một đời tất cả sự nghiệp, danh dự, và cái niệm tin vào phụ nữ. Anh thư minh lãi, trở thành mốt kẻ ăn đạt, sống ngoài lê xã hội. Cho đến một ngày, anh tình cờ phát hiện ra cách để buốc sang mốt giới khác. Khi mốt bảng tráng thai bí ân hiện lên trước mắt anh, Shigeru đã dẫn dẫn ngoại hình của mình để trở thành thàn phân mới là mốt Thán toàn năng, anh bất đầu...",
    };

    return (
        <div className={`flex justify-center items-center`}>
            <div className={`p-4   rounded-lg flex items-center w-full  relative`}
                 onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                    <img src={movieData.image} alt={title} className="w-60 h-80 object-cover rounded-md"/>
                    <button
                        className="bg-red-700 text-white px-4 py-4 rounded hover:bg-red-600 absolute bottom-0 w-full opacity-80">
                        XEM PHIM
                    </button>
                </div>
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{movieData.title}</h2>
                    <p className="text-gray-300 mb-2">{movieData.genres}</p>
                    <p className="text-gray-400 mb-4">{movieData.episodes} | {movieData.country} | {movieData.year}</p>
                    <p className="text-gray-300 text-sm mb-4">{movieData.description}</p>
                </div>
            </div>

        </div>
    );
};

export default MovieDetailCard;