import axios from "./axios.customize.js";

const createUserApi =( name,email,password,accountType)=>{

    const URL_API='/api/register'
    const  data={
        name,email,password,accountType
    }
    return axios.post(URL_API,data)
}
const loginApi =( email,password)=>{

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
const getMovieByIdApi =(movieId)=>{

    const URL_API=`/api/movies/${movieId}`
    return axios.get(URL_API)
}
const createMovieApi = (data) => {
    return axios.post('/api/movies', data);
};
const createEpisodeApi = (movieId, data) => {
    return axios.post(`/api/movies/${movieId}/episodes`, data);
};
const getEpisodeByMovieId=(movieId)=>{
    const URL_API=`/api/movies/${movieId}`
    return axios.get(URL_API)
}
const getMoviesApi = (params = {}) => {
    const URL_API = '/api/movie/filter'; // bỏ dấu "//"
    return axios.get(URL_API, { params }); // đúng cú pháp
};
const increaseEpisodeViewsApi = async (episodeId) => {
    try {
        const URL_API = `/api/episodes/${episodeId}/increase-views`;
        return await axios.post(URL_API);
    } catch (err) {
        console.error('Lỗi khi tăng lượt xem:', err);
        throw err;
    }
};
const updateAccountTypeApi = (accountType) => {
    const URL_API = '/api/user/update-account-type';
    return axios.put(URL_API, { accountType });
};
const rating=(movieId, stars)=>{
    const URL_API='/api/ratings';
    return axios.post(URL_API, { movieId, stars});
}
const getCommentsByMovie = (movieId) =>{
    const URL_API=`/api/comments/${movieId}`;
    return axios.post(URL_API);
}

const addCommentApi = ({ movieId, content }) =>{
    const URL_API=`/api/comments`;
    return axios.post(URL_API, { movieId,content });
}
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
    getCommentsByMovie
};

