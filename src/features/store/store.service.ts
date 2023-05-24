import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export function Storage(data:any){

    return axiosInstance.post(  "/api/newDepot", data);
 }
 
export const useUpdateStore =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterDepot/' + data.id, data)
    })
}

export const useDeleteStore =  () => {
    return useMutation({
        mutationFn: (id: string) => axiosInstance.delete('/api/delDepot/' + id) 
    })
}

export const useGetOneStore =  (id:any) => {
    return useQuery({
        queryKey: ['store', id],
        queryFn: () => axiosInstance.get('/api/depot/' + id)
    })
}

export const useGetAllStore =  () => {
    return useQuery({
        queryKey: ['store'],
        queryFn: () => axiosInstance.get('/api/depots')
    })
}

