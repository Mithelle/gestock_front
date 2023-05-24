import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function  addFamily (data:any){

    return axiosInstance.post("/api/newProductFamily", data);
 }

export const useUpdateProductFamily =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterProductFamily/' + data.id, data)
    })
}

export const useDeleteProductFamily =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delProductFamily/' + id) 
    })
}

export const useGetOneProductFamily =  (id: any) => {
    return useQuery({
        queryKey: ['productFamily', id],
        queryFn: () => axiosInstance.get('/api/productFamily/' + id)
    })
}

export const useGetAllProductFamily =  () => {
    return useQuery({
        queryKey: ['productFamily'],
        queryFn: () => axiosInstance.get('/api/productFamilies')
    })
}

export const useGetAllProductByProductFamily =  (id) => {
    return useQuery({
        queryKey: ['ProductFamily', id, 'product'],
        queryFn: () => axiosInstance.get('/api/productFamily/' + id +'/product')
    })
}
