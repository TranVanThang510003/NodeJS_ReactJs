// import React, { useRef, useEffect, useState } from 'react';
// import { increaseEpisodeViewsApi, updateWatchHistory } from '../../util/api';
// import { isUserPremium, getUserInfoFromToken } from '../../util/auth';
// import { message } from 'antd';
// import UpgradeCard from '../common/UpgradeCard';
// import type { Episode } from '../../types/movie';
//
// interface EpisodeListProps {
//   episodes: Episode[];
//   selectedEpisode: number | null;
//   setSelectedEpisode: React.Dispatch<React.SetStateAction<number | null>>;
// }
//
// declare global {
//   interface Window {
//     onYouTubeIframeAPIReady: () => void;
//     YT: any;
//   }
// }
//
// const EpisodeList: React.FC<EpisodeListProps> = ({
//                                                    episodes = [],
//                                                    selectedEpisode,
//                                                    setSelectedEpisode,
//                                                  }) => {
//   const playerRef = useRef<any>(null);
//   const videoContainerRef = useRef<HTMLDivElement | null>(null);
//   const user = getUserInfoFromToken();
//   const isPremium = isUserPremium();
//   const [upgradeEpisode, setUpgradeEpisode] = useState<number | null>(null);
//   const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
//
//   const selectedEp = episodes.find(
//       (ep) => ep.episodeNumber === Number(selectedEpisode)
//   );
//
//   // Chèn YouTube IFrame API
//   useEffect(() => {
//     if (!(window as any).YT) {
//       const tag = document.createElement('script');
//       tag.src = 'https://www.youtube.com/iframe_api';
//       document.body.appendChild(tag);
//     }
//   }, []);
//
//   // Xử lý click chọn tập
//   const handleEpisodeClick = (ep: Episode) => {
//     const isLocked = ep.isPremium && !isPremium;
//     const now = new Date();
//     const releaseDate = new Date(ep.releaseTime);
//     const notReleased = releaseDate > now;
//
//     if (notReleased) {
//       message.info('Tập này chưa được phát hành!');
//       return;
//     }
//
//     if (isLocked) {
//       if (!user) {
//         message.warning('Vui lòng đăng nhập để xem nội dung.');
//         return;
//       }
//       setUpgradeEpisode(ep.episodeNumber);
//       return;
//     }
//
//     setUpgradeEpisode(null);
//     setSelectedEpisode(ep.episodeNumber);
//     handleWatch(ep);
//   };
//
//   // Tăng view + gửi lịch sử ban đầu
//   const handleWatch = async (ep: Episode) => {
//     try {
//       await increaseEpisodeViewsApi(ep._id);
//       if (user) {
//         await updateWatchHistory({
//           movieId: ep.movieId as string,
//           episodeId: ep._id,
//           progress: 0,
//           isCompleted: false,
//         });
//       }
//     } catch (error) {
//       console.error('Không thể tăng view:', error);
//     }
//   };
//
//   // Khởi tạo YouTube player khi đổi tập
//   useEffect(() => {
//     if (!selectedEp || !selectedEp.videoUrl) return;
//
//     const videoIdMatch = selectedEp.videoUrl.match(
//         /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
//     );
//     const videoId = videoIdMatch ? videoIdMatch[1] : null;
//     if (!videoId) return;
//
//     // Xóa player cũ nếu có
//     if (playerRef.current) {
//       playerRef.current.destroy();
//       playerRef.current = null;
//     }
//     if (progressInterval) {
//       clearInterval(progressInterval);
//       setProgressInterval(null);
//     }
//
//     // Tạo player mới
//     const createPlayer = () => {
//       playerRef.current = new window.YT.Player('youtube-player', {
//         height: '390',
//         width: '640',
//         videoId,
//         playerVars: {
//           autoplay: 1, // Bật autoplay
//           muted: 1,   // Bật chế độ mute để tuân thủ chính sách trình duyệt
//           rel: 0,     // Ngăn liên kết video liên quan
//         },
//         events: {
//           onStateChange: (event: any) => {
//             if (event.data === window.YT.PlayerState.PLAYING) {
//               trackProgress(selectedEp);
//             }
//           },
//         },
//       });
//     };
//
//     if (!window.YT || !window.YT.Player) {
//       window.onYouTubeIframeAPIReady = createPlayer;
//     } else {
//       createPlayer();
//     }
//   }, [selectedEp]);
//
//   // Scroll tới video khi chọn tập
//   useEffect(() => {
//     if (selectedEpisode && videoContainerRef.current) {
//       window.scrollTo({
//         top: videoContainerRef.current.offsetTop - 100,
//         behavior: 'smooth',
//       });
//     }
//   }, [selectedEpisode]);
//
//   // Theo dõi tiến trình xem
//   const trackProgress = (ep: Episode) => {
//     if (!playerRef.current || !user) return;
//     const interval = setInterval(async () => {
//       const duration = playerRef.current.getDuration();
//       const currentTime = playerRef.current.getCurrentTime();
//       const progressPercent = (currentTime / duration) * 100;
//
//       try {
//         await updateWatchHistory({
//           movieId: ep.movieId as string,
//           episodeId: ep._id,
//           progress: progressPercent,
//           isCompleted: progressPercent >= 85,
//         });
//       } catch (err) {
//         console.error('Lỗi gửi tiến trình:', err);
//       }
//
//       if (progressPercent >= 85) {
//         clearInterval(interval);
//       }
//     }, 5000); // gửi mỗi 5 giây
//
//     setProgressInterval(interval);
//   };
//
//   return (
//       <div className="bg-gray-900 p-4 rounded-lg" ref={videoContainerRef}>
//         {/* Video player */}
//         {selectedEp && selectedEp.videoUrl && (
//             <div className="aspect-[16/9] aspect-h-9">
//               <div id="youtube-player" className="w-full h-full rounded" />
//               <p className="text-white text-center mt-2">
//                 Đang xem: Tập {selectedEp.episodeNumber}
//               </p>
//             </div>
//         )}
//
//         <h2 className="text-white text-xl font-semibold my-4">Chọn tập phim:</h2>
//
//         <div className="grid grid-cols-10 gap-2 mb-6">
//           {episodes.map((ep) => {
//             const now = new Date();
//             const releaseDate = new Date(ep.releaseTime);
//             const isLocked = ep.isPremium && !isPremium;
//             const notReleased = releaseDate > now;
//             const isSelected = selectedEpisode === ep.episodeNumber;
//
//             const baseClass =
//                 'py-2 rounded text-center cursor-pointer transition-colors select-none';
//             let className = '';
//             if (notReleased) {
//               className = `${baseClass} bg-gray-600 text-gray-400 cursor-not-allowed`;
//             } else if (isSelected) {
//               className = `${baseClass} bg-orange-500 text-white`;
//             } else if (isLocked) {
//               className = `${baseClass} bg-gray-700 text-gray-400`;
//             } else {
//               className = `${baseClass} bg-gray-800 text-white hover:bg-orange-400`;
//             }
//
//             return (
//                 <div
//                     key={ep._id}
//                     onClick={() => !notReleased && handleEpisodeClick(ep)}
//                     className={className}
//                 >
//                   {notReleased ? (
//                       <span>⏳ Tập {ep.episodeNumber}</span>
//                   ) : isLocked ? (
//                       <span>🔒 Tập {ep.episodeNumber}</span>
//                   ) : (
//                       `Tập ${ep.episodeNumber}`
//                   )}
//                 </div>
//             );
//           })}
//         </div>
//
//         {/* UpgradeCard */}
//         {upgradeEpisode && (
//             <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//               <UpgradeCard onClose={() => setUpgradeEpisode(null)} />
//             </div>
//         )}
//       </div>
//   );
// };
//
// export default EpisodeList;
import React, { useEffect, useRef, useState } from "react";
import { increaseEpisodeViewsApi } from "../../util/api";
import { isUserPremium, getUserInfoFromToken } from "../../util/auth";
import { message } from "antd";
import UpgradeCard from "../common/UpgradeCard";
import VideoPlayer from "./VideoPlayer";
import type { Episode } from "../../types/movie";

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
            } else if (ep.isPremium && !isPremium) {
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
