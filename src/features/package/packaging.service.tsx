import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


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


