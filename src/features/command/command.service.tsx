import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function addCommand(data:any){

    return axiosInstance.post("/api/newShop", data);
 }

export const useUpdateCommand =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterShop/' + data.id, data)
    })
}

export const useDeleteCommand =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delShop/' + id) 
    })
}

export const useGetOneCommand =  (id: any) => {
    return useQuery({
        queryKey: ['commande', id],
        queryFn: () => axiosInstance.get('/api/shop/' + id)
    })
}

export const useGetAllCommand =  () => {
    return useQuery({
        queryKey: ['command'],
        queryFn: () => axiosInstance.get('/api/shops')
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
