import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addInvoice(data:any){

    return axiosInstance.post("/api/newInvoice", data);
 }

export const useUpdateInvoice =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterInvoice/' + data.id, data)
    })
}

export const useDeleteInvoice =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delInvoice/' + id) 
    })
}

export const useGetOneInvoice =  (id: any) => {
    return useQuery({
        queryKey: ['invoice', id],
        queryFn: () => axiosInstance.get('/api/invoice/' + id)
    })
}

export const useGetAllInvoice =  () => {
    return useQuery({
        queryKey: ['invoice'],
        queryFn: () => axiosInstance.get('/api/invoices')
    })
}

export const useGetAllStoreByInvoice =  (id) => {
    return useQuery({
        queryKey: ['invoice', id, 'depot'],
        queryFn: () => axiosInstance.get('/api/invoice/' + id +'/depot')
    })
}

export const useGetAllUserByInvoice =  (id) => {
    return useQuery({
        queryKey: ['invoice', id, 'user'],
        queryFn: () => axiosInstance.get('/api/invoice/' + id +'/user')
    })
}

