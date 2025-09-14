import React, { useEffect, useRef, useState } from "react";
import type { Episode } from "../../types/movie";
import {useFetchWatchHistory, useWatchHistory} from "../../hook/useWatchHistory";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface VideoPlayerProps {
    episode: Episode;
    user: any;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ episode, user }) => {
    const playerRef = useRef<any>(null);
    const [player, setPlayer] = useState<any>(null);

    // Load YouTube API
    useEffect(() => {
        if (!(window as any).YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
    }, []);
//  lấy progress đã lưu từ server
    const savedProgress = useFetchWatchHistory(episode.movieId as string, episode._id);

    // Khởi tạo player khi đổi tập
    useEffect(() => {
        if (!episode?.videoUrl) return;

        const videoIdMatch = episode.videoUrl.match(
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
        );
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) return;

        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }

        const createPlayer = () => {
            playerRef.current = new window.YT.Player("youtube-player", {
                height: "390",
                width: "640",
                videoId,
                playerVars: { autoplay: 1, muted: 1, rel: 0 , controls: 1,
                    enablejsapi: 1},
                events: {
                    onReady: (event: any) => {
                        setPlayer(playerRef.current);

                        // Seek đến vị trí đã lưu (nếu có)
                        if (savedProgress > 0) {
                            const duration = event.target.getDuration();
                            const seekTime = (savedProgress / 100) * duration;
                            event.target.seekTo(seekTime, true);
                        }
                    },
                },
            });
        };

        if (!window.YT || !window.YT.Player) {
            window.onYouTubeIframeAPIReady = createPlayer;
        } else {
            createPlayer();
        }
    }, [episode]);

    // Hook gửi watch history
    useWatchHistory(player, user, episode);

    return (
        <div className="aspect-[16/9] aspect-h-9">
            <div id="youtube-player" className="w-full h-full rounded" />
            <p className="text-white text-center mt-2">
                Đang xem: Tập {episode.episodeNumber}
            </p>
        </div>
    );
};

export default VideoPlayer;
