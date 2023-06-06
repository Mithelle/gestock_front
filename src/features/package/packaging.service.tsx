import axiosInstance from "@/utils/axios";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";


export function addPackage(data:any){

    return axiosInstance.post("/api/newPackage", data);
 }

export const useDeletePackage =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delPackage/' + id) 
    })
}

export const useGetOnePackage =  (id: any) => {
    return useQuery({
        queryKey: ['package', id],
        queryFn: () => axiosInstance.get('/api/package/' + id)
    })
}

export const useGetAllPackage =  () => {
    return useQuery({
        queryKey: ['package'],
        queryFn: () => axiosInstance.get('/api/packages')
    })
}

export const useGetAllPackageByProduct =  (product_id: any) => {
    return useQuery({
        queryKey: ['package', product_id],
        queryFn: () => axiosInstance.get('/api/packages/' + product_id)
    })
}

export const useGetMultiplePackageByProduct =  (products: string[]) => {
    return useQueries({
        queries: products.map((product_id) =>{
            return {
                queryKey: ['packages', product_id],
                queryFn: () => axiosInstance.get('/api/packages/' + product_id)
            }
        }
        )
    })
}


