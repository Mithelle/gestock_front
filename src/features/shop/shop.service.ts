import axiosInstance from "@/utils/axios";


export const getAllShop = async () =>{
    return axiosInstance.get('/api/shops');
} 