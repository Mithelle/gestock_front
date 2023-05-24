import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function ControlShop(data:any){

    return axiosInstance.post("/api/newShop", data);
 }

export const useUpdateControl =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterShop/' + data.id, data)
    })
}

export const useDeleteControl =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delShop/' + id) 
    })
}

export const useGetOneControl =  (id: any) => {
    return useQuery({
        queryKey: ['control', id],
        queryFn: () => axiosInstance.get('/api/shop/' + id)
    })
}

export const useGetAllControl =  () => {
    return useQuery({
        queryKey: ['control'],
        queryFn: () => axiosInstance.get('/api/shops')
    })
}

/*export const useGetAllStoreByShop =  (id) => {
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

