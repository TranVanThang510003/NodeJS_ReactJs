export interface Episode {
    _id: string;
    movieId: string;
    title: string;
    episodeNumber: number;
    videoUrl: string;
    isPremium: boolean;
    releaseTime: string; // ISO date string
    createdAt: string;
    views?: number;
    __v?: number;
}

export interface Rating {
    _id: string;
    movieId: string;
    userId: string;
    stars: number;
    createdAt: string;
    __v?: number;
}

export interface Movie {
    _id: string;
    title: string;
    originalTitle?: string;
    country?: string;
    releaseDate?: string;
    genres?: string[];
    description?: string;
    poster?: string;
    createdAt?: string;
    __v?: number;

    episodes?: Episode[];
    latestEpisodeDate?: string;
    totalViews?: number;

    ratings?: Rating[];
    averageRating: number;
    ratingCount?: number;
    popularityScore?: number;
}
