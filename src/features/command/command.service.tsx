import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addCommand(data:any){

    return axiosInstance.post("/api/newCommand", data);
 }

export const useUpdateCommand =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterCommand/' + data.id, data)
    })
}

export const useDeleteCommand =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delCommand/' + id) 
    })
}

export const useGetOneCommand =  (id: any) => {
    return useQuery({
        queryKey: ['commande', id],
        queryFn: () => axiosInstance.get('/api/command/' + id)
    })
}

export const useGetAllCommand =  () => {
    return useQuery({
        queryKey: ['command'],
        queryFn: () => axiosInstance.get('/api/commands')
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
}
*/
