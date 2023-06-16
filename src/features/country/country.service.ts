import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useGetAllCountry =  () => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: () => axiosInstance.get('/api/countries')
    })
}
