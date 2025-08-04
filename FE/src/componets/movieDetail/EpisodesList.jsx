import React, { useRef, useEffect } from 'react';

const EpisodeList = ({ episodes = [], selectedEpisode, setSelectedEpisode, isUserPremium = false }) => {
    const videoRef = useRef(null);

    const selectedEp = episodes.find(ep => ep.episodeNumber === Number(selectedEpisode));

    function convertToEmbedUrl(originalUrl) {
        const match = originalUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : originalUrl;
    }

    useEffect(() => {
        if (selectedEpisode && videoRef.current) {
            window.scrollTo({
                top: videoRef.current.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }, [selectedEpisode]);

    return (
      <div className="bg-gray-900 p-4 rounded-lg" ref={videoRef}>
          {selectedEp && selectedEp.videoUrl && (
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-[400px] rounded"
                  src={`${convertToEmbedUrl(selectedEp.videoUrl)}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
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

          <h2 className="text-white text-xl font-semibold mb-4">Chọn tập phim:</h2>

          <div className="grid grid-cols-10 gap-2 mb-6">
              {episodes.map((ep) => {
                  const isLocked = ep.isPremium && !isUserPremium;

                  return (
                    <div
                      key={ep._id}
                      onClick={() => {
                          if (!isLocked) {
                              setSelectedEpisode(Number(ep.episodeNumber));
                          }
                      }}
                      className={`py-2 rounded text-center cursor-pointer transition-colors select-none 
                                ${
                        selectedEpisode === ep.episodeNumber
                          ? 'bg-orange-500 text-white'
                          : isLocked
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-800 text-white hover:bg-orange-400'
                      }
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
      </div>
    );
};

export default EpisodeList;
