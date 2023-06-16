import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addOrder(data:any){

    return axiosInstance.post("/api/newOrder", data);
 }

export const useUpdateOrder =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterOrder/' + data.id, data)
    })
}

export const useDeleteOrder =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delOrder/' + id) 
    })
}

export const useGetOneOrder =  (id: any) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => axiosInstance.get('/api/order/' + id)
    })
}

export const useGetAllOrder =  () => {
    return useQuery({
        queryKey: ['order'],
        queryFn: () => axiosInstance.get('/api/orders')
    })
}


