import axios from "./axios.customize.js";

const createUserApi =( name,email,password)=>{

    const URL_API='/api/register'
    const  data={
        name,email,password
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
export {
    createUserApi,
    loginApi,
    getUserApi,
    createMovieApi,
    createEpisodeApi,
    getMovieApi,
    getMovieByIdApi,
    getEpisodeByMovieId,

};

