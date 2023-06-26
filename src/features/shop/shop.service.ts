import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function CompShop(data:any){

    return axiosInstance.post("/api/newShop", data);
 }

export const useUpdateShop =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterShop/' + data.id, data)
    })
}

export const useDeleteShop =  () => {
    return useMutation({
        mutationFn: (id: string) => axiosInstance.delete('/api/delShop/' + id) 
    })
}

export const useGetOneShop =  (id: any) => {
    return useQuery({
        queryKey: ['shop', id],
        queryFn: () => axiosInstance.get('/api/shop/' + id)
    })
}

export const useGetAllShop =  () => {
    return useQuery({
        queryKey: ['shop'],
        queryFn: () => axiosInstance.get('/api/shops')
    })
}

export const useGetAllStoreByShop =  (id) => {
    return useQuery({
        queryKey: ['shop', id, 'depot'],
        queryFn: () => axiosInstance.get('/api/shop/' + id +'/depot')
    })
}

export const useGetAllUserByShop =  (id) => {
    return useQuery({
        queryKey: ['shop', id, 'user'],
        queryFn: () => axiosInstance.get('/api/shop/' + id +'/user')
    })
}

