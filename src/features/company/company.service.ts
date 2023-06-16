import axiosInstance from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";


export function CompanyCreate(data:any){

    return axiosInstance.post("/api/newCompany", data);
 }
 
 export const useGetAllCountry =  () => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: () => axiosInstance.get('/api/countries')
    })
}

 