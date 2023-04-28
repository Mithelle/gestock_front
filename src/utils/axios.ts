
/*
import { BASE_URL } from '@/features/auth';
import axios from 'axios';
import Cookies from 'js-cookie';


const getPostsData = () => {
  return  axios.get(BASE_URL + "/api/product" , {
    headers:{
        'Authorization': "Bearer " + Cookies.get("token")
    }
  })
    .then(data => console.log(data.data))
    .catch(error => console.log(error));
};
   getPostsData();*/

import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

let api: AxiosInstance

 function axiosInstance(){
  api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false
  })

  api.interceptors.request.use((config) => {
    if(Cookies.get("token")){
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }

    return config
  })

  return api

}



export default axiosInstance();