import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export function CreateUser(data:any){

    return axiosInstance.post(  "/api/newUser", data);
 }
 
export const useUpdateUser =  () => {
    return useMutation({
        mutationFn: (data) => axiosInstance.put('/api/alterUser/'+ data.id, data)
    })
}

export const useDeleteUser =  () => {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete('/api/delUser/' + id) 
    })
}

export const useGetOneUser =  (id:any) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => axiosInstance.get('/api/user/' + id)
    })
}

export const useGetAllUser =  () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => axiosInstance.get('/api/users')
    })
}
