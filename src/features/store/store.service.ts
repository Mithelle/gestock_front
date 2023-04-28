import axiosInstance from "@/utils/axios";


export const getAllStore = async () =>{
    return axiosInstance.get('/api/depots');
} 