import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addProforma(data:any){

    return axiosInstance.post("/api/newProforma", data);
 }

export const useUpdateProforma =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterProforma/' + data.id, data)
    })
}

export const useDeleteProforma =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delProforma/' + id) 
    })
}

export const useGetOneProforma =  (id: any) => {
    return useQuery({
        queryKey: ['proforma', id],
        queryFn: () => axiosInstance.get('/api/proforma/' + id)
    })
}

export const useGetAllProforma =  () => {
    return useQuery({
        queryKey: ['proforma'],
        queryFn: () => axiosInstance.get('/api/proformas')
    })
}


