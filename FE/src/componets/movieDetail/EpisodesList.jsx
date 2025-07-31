import React, { useRef, useEffect } from 'react';

// Danh sách video YouTube theo tập (giả định)
const episodeVideos = {
    1: 'cyF7m5syODA',
    2: '3JZ_D3ELwOQ',
    3: 'tgbNymZ7vqY',
    4: 'M7lc1UVf-VE',
    5: 'sNPnbI1arSE',
    6: 'cyF7m5syODA',
    7: '3JZ_D3ELwOQ',
    8: 'tgbNymZ7vqY',
    9: 'M7lc1UVf-VE',
    10: 'sNPnbI1arSE',
    11: 'cyF7m5syODA',
    12: '3JZ_D3ELwOQ',
    13: 'tgbNymZ7vqY',
    14: 'M7lc1UVf-VE',
    15: 'sNPnbI1arSE',
};

const EpisodeList = ({ episodes, selectedEpisode, setSelectedEpisode }) => {
    const episodeNumbers = episodes || Object.keys(episodeVideos).map(Number);
    const videoRef = useRef(null);

    // Tự động cuộn xuống khi chọn tập
    useEffect(() => {
        if (selectedEpisode && videoRef.current) {
            videoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedEpisode]);

    return (
        <div className="bg-gray-900 p-4 rounded-lg" ref={videoRef}>
            {/* Hiển thị video nếu có tập được chọn */}
            {selectedEpisode && episodeVideos[selectedEpisode] && (
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        className="w-full h-[400px] rounded"
                        src={`https://www.youtube.com/embed/${episodeVideos[selectedEpisode]}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
                        title={`Tập ${selectedEpisode}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                    <p className="text-white text-center mt-2">Đang xem: Tập {selectedEpisode}</p>
                </div>
            )}
            <h2 className="text-white text-xl font-semibold mb-4">Chọn tập phim:</h2>

            {/* Danh sách tập */}
            <div className="grid grid-cols-10 gap-2 mb-6">
                {episodeNumbers.map((episode) => (
                    <div
                        key={episode}
                        onClick={() => setSelectedEpisode(episode)}
                        className={`py-2 rounded text-center cursor-pointer transition-colors ${
                            selectedEpisode === episode
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-800 text-white hover:bg-orange-400'
                        }`}
                    >
                        Tập {episode}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EpisodeList;
