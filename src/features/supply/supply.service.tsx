import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addSupply(data:any){

    return axiosInstance.post("/api/newSupply", data);
 }

export const useUpdateSupply =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterSupply/' + data.id, data)
    })
}

export const useDeleteSupply =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delSupply/' + id) 
    })
}

export const useGetOneSupply =  (id: any) => {
    return useQuery({
        queryKey: ['supply', id],
        queryFn: () => axiosInstance.get('/api/supply/' + id)
    })
}

export const useGetAllSupply =  () => {
    return useQuery({
        queryKey: ['supply'],
        queryFn: () => axiosInstance.get('/api/supplies')
    })
}

export const useGetAllStoreBySupply =  (id) => {
    return useQuery({
        queryKey: ['supply', id, 'depot'],
        queryFn: () => axiosInstance.get('/api/supply/' + id +'/depot')
    })
}

export const useGetAllUserBySupply =  (id) => {
    return useQuery({
        queryKey: ['supply', id, 'user'],
        queryFn: () => axiosInstance.get('/api/supply/' + id +'/user')
    })
}

