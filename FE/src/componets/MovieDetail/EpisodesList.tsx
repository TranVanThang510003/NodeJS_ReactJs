
import React, { useEffect, useRef, useState } from "react";
import { increaseEpisodeViewsApi } from "../../util/api";
import { isUserPremium, getUserInfoFromToken } from "../../util/auth";
import { message } from "antd";
import UpgradeCard from "../common/UpgradeCard";
import VideoPlayer from "./VideoPlayer";
import type { Episode } from "../../types/movie";
import {useMovieWatchHistory} from "../../hook/useWatchHistory";

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
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const user = getUserInfoFromToken();
  const isPremium = isUserPremium();
  const [upgradeEpisode, setUpgradeEpisode] = useState<number | null>(null);

  const watchedEpisodes = useMovieWatchHistory(episodes[0]?.movieId || "");

  const selectedEp = episodes.find(
      (ep) => ep.episodeNumber === Number(selectedEpisode)
  );

  const handleEpisodeClick = async (ep: Episode) => {
    const now = new Date();
    const releaseDate = new Date(ep.releaseTime);

    if (releaseDate > now) {
      message.info("Tập này chưa được phát hành!");
      return;
    }
    if (ep.isPremium && !isPremium) {
      if (!user) {
        message.warning("Vui lòng đăng nhập để xem nội dung.");
        return;
      }
      setUpgradeEpisode(ep.episodeNumber);
      return;
    }

    setUpgradeEpisode(null);
    setSelectedEpisode(ep.episodeNumber);

    try {
      await increaseEpisodeViewsApi(ep._id);
    } catch (err) {
      console.error("Không thể tăng view:", err);
    }
  };

  // Scroll tới video khi chọn tập
  useEffect(() => {
    if (selectedEpisode && videoContainerRef.current) {
      window.scrollTo({
        top: videoContainerRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }, [selectedEpisode]);

  return (
      <div className="bg-gray-900 p-4 rounded-lg" ref={videoContainerRef}>
        {/* Video player */}
        {selectedEp && <VideoPlayer episode={selectedEp} user={user} />}

        <h2 className="text-white text-xl font-semibold my-4">Chọn tập phim:</h2>

        <div className="grid grid-cols-10 gap-2 mb-6">
          {episodes.map((ep) => {
            const now = new Date();
            const isWatched = watchedEpisodes[ep._id] >= 85;
            const releaseDate = new Date(ep.releaseTime);
            const notReleased = releaseDate > now;
            const isSelected = selectedEpisode === ep.episodeNumber;

            const baseClass =
                "py-2 rounded text-center cursor-pointer transition-colors select-none";
            let className = "";
            if (notReleased) {
              className = `${baseClass} bg-gray-600 text-gray-400 cursor-not-allowed`;
            } else if (isSelected) {
              className = `${baseClass} bg-orange-500 text-white`;
            } else if (isWatched) {
              className = `${baseClass} bg-green-600 text-white`;
            }else if (ep.isPremium && !isPremium) {
              className = `${baseClass} bg-gray-700 text-gray-400`;
            } else {
              className = `${baseClass} bg-gray-800 text-white hover:bg-orange-400`;
            }

            return (
                <div
                    key={ep._id}
                    onClick={() => !notReleased && handleEpisodeClick(ep)}
                    className={className}
                >
                  {notReleased ? (
                      <span>⏳ Tập {ep.episodeNumber}</span>
                  ) : ep.isPremium && !isPremium ? (
                      <span>🔒 Tập {ep.episodeNumber}</span>
                  ) : (
                      `Tập ${ep.episodeNumber}`
                  )}
                </div>
            );
          })}
        </div>

        {/* UpgradeCard */}
        {upgradeEpisode && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
              <UpgradeCard onClose={() => setUpgradeEpisode(null)} />
            </div>
        )}
      </div>
  );
};

export default EpisodeList;
