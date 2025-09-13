import type {Episode} from "../types/movie"
import {useEffect, useState} from "react";
import {getEpisodeByMovieId} from "../util/api";

export const useEpisodes = (movieId:string) => {
    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchEpisodesByMovieId = async () => {
            setLoading(true);
            setEpisodes([]);
            try {
                const response = await getEpisodeByMovieId(movieId)
                setEpisodes(response.data.episodes)
            }catch (error) {
                setError(error)
            }finally {
                setLoading(false);
            }

        }
        fetchEpisodesByMovieId()
    },[movieId])

    return {episodes,error, loading}
}