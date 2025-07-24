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

export {
    createUserApi,loginApi,
}

