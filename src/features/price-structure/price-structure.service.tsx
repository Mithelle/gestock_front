import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addPrice(data:any){

    return axiosInstance.post("/api/newStructure", data);
 }

export const useUpdatePrice =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterStructure/' + data.id, data)
    })
}

export const useDeletePrice =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delStructure/' + id) 
    })
}

export const useGetOnePrice =  (id: any) => {
    return useQuery({
        queryKey: ['shop', id],
        queryFn: () => axiosInstance.get('/api/structure/' + id)
    })
}

export const useGetAllPrice =  () => {
    return useQuery({
        queryKey: ['price'],
        queryFn: () => axiosInstance.get('/api/structures')
    })
}

