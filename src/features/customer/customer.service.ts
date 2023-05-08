import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addCustomer(data:any){

    return axiosInstance.post("/api/newCustomer", data);
 }

export const useUpdateCustomer =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.post('/api/alterCustomer/' + data.id, data)
    })
}

export const useDeleteCustomer =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.post('/api/delCustomer/' + id) 
    })
}

export const useGetOneCustomer=  (id: any) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => axiosInstance.get('/api/customer/' + id)
    })
}

export const useGetAllCustomer =  () => {
    return useQuery({
        queryKey: ['customer'],
        queryFn: () => axiosInstance.get('/api/customers')
    })
}

