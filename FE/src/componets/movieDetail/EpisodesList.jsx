import React, { useRef, useEffect, useState } from 'react'
import { increaseEpisodeViewsApi } from '../../util/api.js';
import { getUserInfoFromToken } from '../../util/auth.js';
import { message } from 'antd';
import UpgradeCard from '../common/UpgradeCard.jsx';

const EpisodeList = ({ episodes = [], selectedEpisode, setSelectedEpisode }) => {
  const videoRef = useRef(null);
  const user = getUserInfoFromToken();
  const isPremium = user?.accountType === 'premium';
  const [upgradeEpisode, setUpgradeEpisode] = useState(null); // 🆕 theo dõi tập cần nâng cấp

  const selectedEp = episodes.find(ep => ep.episodeNumber === Number(selectedEpisode));

  function convertToEmbedUrl(originalUrl) {
    const match = originalUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : originalUrl;
  }

  const handleWatch = async (episodeId) => {
    try {
      await increaseEpisodeViewsApi(episodeId);
    } catch (error) {
      console.error('Không thể tăng view:', error);
    }
  };

  const handleEpisodeClick = (ep) => {
    const isLocked = ep.isPremium && !isPremium;

    if (!user) {
      message.warning('Vui lòng đăng nhập để xem nội dung.');
      return;
    }

    if (isLocked) {
      setUpgradeEpisode(ep.episodeNumber); // 🆕 hiện UI nâng cấp
      return;
    }

    setUpgradeEpisode(null); // 🆕 ẩn UpgradeCard nếu tập không bị khóa
    setSelectedEpisode(Number(ep.episodeNumber));
    handleWatch(ep._id);
  };

  useEffect(() => {
    if (selectedEpisode && videoRef.current) {
      window.scrollTo({
        top: videoRef.current.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  }, [selectedEpisode]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg" ref={videoRef}>
      {/* Video player */}
      {selectedEp && selectedEp.videoUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-[400px] rounded"
            src={`${convertToEmbedUrl(selectedEp.videoUrl)}?autoplay=1&rel=0`}
            title={`Tập ${selectedEp.episodeNumber}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <p className="text-white text-center mt-2">Đang xem: Tập {selectedEp.episodeNumber}</p>
        </div>
      )}

      <h2 className="text-white text-xl font-semibold my-4">Chọn tập phim:</h2>

      <div className="grid grid-cols-10 gap-2 mb-6">
        {episodes.map((ep) => {
          const isLocked = ep.isPremium && !isPremium;
          const isSelected = selectedEpisode === ep.episodeNumber;

          return (
            <div
              key={ep._id}
              onClick={() => handleEpisodeClick(ep)}
              className={`py-2 rounded text-center cursor-pointer transition-colors select-none 
                ${isSelected ? 'bg-orange-500 text-white' :
                isLocked ? 'bg-gray-700 text-gray-400' :
                  'bg-gray-800 text-white hover:bg-orange-400'}
              `}
            >
              {isLocked ? (
                <span>🔒 Tập {ep.episodeNumber}</span>
              ) : (
                `Tập ${ep.episodeNumber}`
              )}
            </div>
          );
        })}
      </div>

      {/* Upgrade Card */}
      {upgradeEpisode && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <UpgradeCard onClose={() => setUpgradeEpisode(null)}  />
        </div>
      )}

    </div>
  );
};

export default EpisodeList;
