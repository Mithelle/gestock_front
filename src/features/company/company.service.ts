import axiosInstance from "@/utils/axios";


export function CompanyCreate(data:any){

    return axiosInstance.post("/api/newCompany", data);
 }
 


 