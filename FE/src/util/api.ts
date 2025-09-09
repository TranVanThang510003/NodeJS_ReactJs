import axios from "./axios.customize.js";

const createUserApi =( name: string,email: string,password: string,accountType: string)=>{

    const URL_API='/api/register'
    const  data={
        name,email,password,accountType
    }
    return axios.post(URL_API,data)
}
const loginApi =( email: string,password: string)=>{

    const URL_API='/api/login'
    const  data={
        email,password
    }
    return axios.post(URL_API,data)
}

const getUserApi =()=>{

    const URL_API='/api/user'
    return axios.get(URL_API)
}

const getMovieApi =()=>{

    const URL_API='/api/movies'
    return axios.get(URL_API)
}
const getMovieByIdApi =(movieId: string)=>{

    const URL_API=`/api/movies/${movieId}`
    return axios.get(URL_API)
}
const createMovieApi = (data: any) => {
    return axios.post('/api/movies', data);
};
const createEpisodeApi = (movieId: string, data: any) => {
    return axios.post(`/api/movies/${movieId}/episodes`, data);
};
const getEpisodeByMovieId=(movieId: string)=>{
    const URL_API=`/api/movies/${movieId}`
    return axios.get(URL_API)
}
const getMoviesApi = (params: Record<string, any> = {}) => {
    const URL_API = '/api/Movie/filter';
    return axios.get(URL_API, { params });
};

const increaseEpisodeViewsApi = async (episodeId: string) => {
    try {
        const URL_API = `/api/episodes/${episodeId}/increase-views`;
        return await axios.post(URL_API);
    } catch (err) {
        console.error('Lỗi khi tăng lượt xem:', err);
        throw err;
    }
};

const userInformationApi = () => {
    const URL_API = '/api/me';
    return axios.get(URL_API);
};

const updateAccountTypeApi = (accountType: string) => {
    const URL_API = '/api/user/update-account-type';
    return axios.put(URL_API, { accountType });
};

const rating = (movieId: string, stars: number) => {
    const URL_API = '/api/ratings';
    return axios.post(URL_API, { movieId, stars });
};

 const getCommentsByMovie = (movieId: string) => {
    const URL_API = `/api/comments/${movieId}`;
    return axios.get(URL_API);
};

const addCommentApi = (payload: { movieId: string; content: string }) => {
    const URL_API = `/api/comments`;
    return axios.post(URL_API, payload);
};

const addFavoriteApi = (payload: { movieId: string }) => {
    const URL_API = `/api/favorites/${payload.movieId}`;
    return axios.post(URL_API);
};
const deleteFavoriteApi = (payload: { movieId: string }) => {
    const URL_API = `/api/favorites/${payload.movieId}`;
    return axios.delete(URL_API);
};

 const getFavoritesApi = () => {
    const URL_API = `/api/favorites`;
    return axios.get(URL_API);
};
export {
    createUserApi,
    loginApi,
    getUserApi,
    createMovieApi,
    createEpisodeApi,
    getMovieApi,
    getMovieByIdApi,
    getEpisodeByMovieId,
    getMoviesApi,
    increaseEpisodeViewsApi,
    updateAccountTypeApi,
    rating,
    addCommentApi,
    getCommentsByMovie,
    addFavoriteApi,
    deleteFavoriteApi,
    getFavoritesApi,
    userInformationApi,
};

