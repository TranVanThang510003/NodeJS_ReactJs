import {useEffect, useRef, useState} from "react";
import { updateWatchHistory, getWatchHistory } from "../util/api";
import type { Episode } from "../types/movie";
export const useFetchWatchHistory = (movieId: string, episodeId: string) => {
    const [history, setHistory] = useState<number>(0);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await getWatchHistory({movieId, episodeId})

                if (res.data.success && res.data.data) {
                    setHistory(res.data.data.progress);
                }
            } catch (err) {
                console.error("Lỗi lấy lịch sử xem", err);
            }
        };

        fetchHistory();
    }, [movieId, episodeId]);

    return history;
};

export const useWatchHistory = (player: any, user: any, episode: Episode | null) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!player || !user || !episode) return;

        const interval = setInterval(async () => {
            const duration = player.getDuration?.();
            const currentTime = player.getCurrentTime?.();
            if (!duration || !currentTime) return;

            const progressPercent = (currentTime / duration) * 100;

            try {
                await updateWatchHistory({
                    movieId: episode.movieId as string,
                    episodeId: episode._id,
                    progress: progressPercent,
                    isCompleted: progressPercent >= 85,
                });
            } catch (err) {
                console.error("Lỗi gửi tiến trình:", err);
            }

            if (progressPercent >= 85) {
                clearInterval(interval);
            }
        }, 5000);

        intervalRef.current = interval;
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [player, user, episode]);
};
