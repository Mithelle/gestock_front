import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addDelivery(data:any){

    return axiosInstance.post("/api/newDelivery", data);
 }

export const useUpdateDelivery =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterShop/' + data.id, data)
    })
}

export const useDeleteDelivery =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delShop/' + id) 
    })
}

export const useGetOneDelivery =  (id: any) => {
    return useQuery({
        queryKey: ['delivery', id],
        queryFn: () => axiosInstance.get('/api/shop/' + id)
    })
}

export const useGetAllDelivery =  () => {
    return useQuery({
        queryKey: ['delivery'],
        queryFn: () => axiosInstance.get('/api/shops')
    })
}

export const useGetAllStoreByShop =  (id) => {
    return useQuery({
        queryKey: ['delivery', id, 'depot'],
        queryFn: () => axiosInstance.get('/api/shop/' + id +'/depot')
    })
}

export const useGetAllUserByDelivery =  (id) => {
    return useQuery({
        queryKey: ['delivery', id, 'user'],
        queryFn: () => axiosInstance.get('/api/shop/' + id +'/user')
    })
}

