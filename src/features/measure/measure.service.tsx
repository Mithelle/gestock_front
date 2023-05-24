import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOneMeasure =  (id: any) => {
    return useQuery({
        queryKey: ['measure', id],
        queryFn: () => axiosInstance.get('/api/measure/' + id)
    })
}

export const useGetAllMeasure =  () => {
    return useQuery({
        queryKey: ['measure'],
        queryFn: () => axiosInstance.get('/api/measures')
    })
}

