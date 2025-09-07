import React, { useRef, useEffect, useState } from 'react';
import { increaseEpisodeViewsApi } from '../../util/api';
import { isUserPremium ,getUserInfoFromToken } from '../../util/auth';
import { message } from 'antd';
import UpgradeCard from '../common/UpgradeCard';
import type { Episode } from '../../types/movie';

interface EpisodeListProps {
  episodes: Episode[];
  selectedEpisode: number | null;
  setSelectedEpisode: React.Dispatch<React.SetStateAction<number | null>>;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes = [],
  selectedEpisode,
  setSelectedEpisode,
}) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const user = getUserInfoFromToken();
  const isPremium = isUserPremium();
  const [upgradeEpisode, setUpgradeEpisode] = useState<number | null>(null); //  theo dõi tập cần nâng cấp

  const selectedEp = episodes.find(
    (ep) => ep.episodeNumber === Number(selectedEpisode)
  );

  function convertToEmbedUrl(originalUrl: string) {
    const match = originalUrl.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : originalUrl;
  }

  const handleWatch = async (episodeId: string) => {
    try {
      await increaseEpisodeViewsApi(episodeId);
    } catch (error) {
      console.error('Không thể tăng view:', error);
    }
  };

  const handleEpisodeClick = (ep: Episode) => {
    const isLocked = ep.isPremium && !isPremium;
    const now = new Date();
    const releaseDate = new Date(ep.releaseTime);
    const notReleased = releaseDate > now;


    if (notReleased) {
      message.info('Tập này chưa được phát hành!');
      return;
    }
    if (isLocked) {
      if (!user) {
      message.warning('Vui lòng đăng nhập để xem nội dung.');
      return;
    }
      setUpgradeEpisode(ep.episodeNumber); // 🆕 hiện UI nâng cấp
      return;
    }

    setUpgradeEpisode(null); // 🆕 ẩn UpgradeCard nếu tập không bị khóa
    setSelectedEpisode(ep.episodeNumber);
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
        <div className="aspect-[16/9] aspect-h-9">
          <iframe
            className="w-full  h-full rounded"
            src={`${convertToEmbedUrl(selectedEp.videoUrl)}?autoplay=1&rel=0`}
            title={`Tập ${selectedEp.episodeNumber}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <p className="text-white text-center mt-2">
            Đang xem: Tập {selectedEp.episodeNumber}
          </p>
        </div>
      )}

      <h2 className="text-white text-xl font-semibold my-4">Chọn tập phim:</h2>

      <div className="grid grid-cols-10 gap-2 mb-6">
        {episodes.map((ep) => {
          const now = new Date();
          const releaseDate = new Date(ep.releaseTime);
          const isLocked = ep.isPremium && !isPremium;
          const notReleased = releaseDate > now;
          const isSelected = selectedEpisode === ep.episodeNumber;

          const baseClass = `py-2 rounded text-center cursor-pointer transition-colors select-none`;

          let className = '';
          if (notReleased) {
            className = `${baseClass} bg-gray-600 text-gray-400 cursor-not-allowed`;
          } else if (isSelected) {
            className = `${baseClass} bg-orange-500 text-white`;
          } else if (isLocked) {
            className = `${baseClass} bg-gray-700 text-gray-400`;
          } else {
            className = `${baseClass} bg-gray-800 text-white hover:bg-orange-400`;
          }

          return (
            <div
              key={ep._id}
              onClick={() => !notReleased && handleEpisodeClick(ep)} // ❌ Không cho click nếu chưa phát hành
              className={className}
            >
              {notReleased ? (
                <span>⏳ Tập {ep.episodeNumber}</span>
              ) : isLocked ? (
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
          <UpgradeCard onClose={() => setUpgradeEpisode(null)} />
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
