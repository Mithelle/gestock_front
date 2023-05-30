import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addInventory(data:any){

    return axiosInstance.post("/api/newInventory", data);
 }

export const useUpdateInventory =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterInventory/' + data.id, data)
    })
}

export const useDeleteInventory =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delInventory/' + id) 
    })
}

export const useGetOneInventory=  (id: any) => {
    return useQuery({
        queryKey: ['shop', id],
        queryFn: () => axiosInstance.get('/api/inventory/' + id)
    })
}

export const useGetAllInventory =  () => {
    return useQuery({
        queryKey: ['shop'],
        queryFn: () => axiosInstance.get('/api/inventories')
    })
}

/*export const useGetAllStoreByShop =  (id) => {
    return useQuery({
        queryKey: ['shop', id, 'depot'],
        queryFn: () => axiosInstance.get('/api/shop/' + id +'/depot')
    })
}

export const useGetAllUserByShop =  (id) => {
    return useQuery({
        queryKey: ['shop', id, 'user'],
        queryFn: () => axiosInstance.get('/api/shop/' + id +'/user')
    })
}*/

