import axiosInstance from "@/utils/axios";


export const getAllUser = async () =>{
    return axiosInstance.get('/api/users');
} 