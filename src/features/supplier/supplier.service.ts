import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addSupplier(data:any){

    return axiosInstance.post("/api/newSupplier", data);
 }

export const useUpdateSupplier =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterSupplier/' + data.id, data)
    })
}

export const useDeleteSupplier =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delSupplier/' + id) 
    })
}

export const useGetOneSupplier =  (id: any) => {
    return useQuery({
        queryKey: ['supplier', id],
        queryFn: () => axiosInstance.get('/api/supplier/' + id)
    })
}

export const useGetAllSupplier =  () => {
    return useQuery({
        queryKey: ['supplier'],
        queryFn: () => axiosInstance.get('/api/suppliers')
    })
}

