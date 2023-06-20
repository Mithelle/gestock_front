import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addProduct(data:any){

    return axiosInstance.post("/api/newProduct", data);
 }

export const useUpdateProduct =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterProduct/' + data.id, data)
    })
}

export const useDeleteProduct =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delProduct/' + id) 
    })
}

export const useGetOneProduct =  (id: any) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => axiosInstance.get('/api/product/' + id)
    })
}

export const useGetAllProduct =  () => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => axiosInstance.get('/api/products')
    })
}

/*export const useGetAllPackageByProduct =  (id) => {
    return useQuery({
        queryKey: ['product', id, 'package'],
        queryFn: () => axiosInstance.get('/api/product/' + id +'/package')
    })
}*/
export const useGetAllPriceByProduct =  (id) => {
    return useQuery({
        queryKey: ['product', id, 'structure'],
        queryFn: () => axiosInstance.get('/api/product/' + id +'/structure')
    })
}
