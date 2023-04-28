import axios from "axios";
import axiosInstance from "@/utils/axios";

export const BASE_URL = 'http://localhost:8000';

export function createAccount(data:any){
   return axios.post( BASE_URL + "/api/register", data);
}

export async function loginUser(data:any){
   const response = await axios.post( BASE_URL + "/api/login",data);

   return response; 
}
export async function confirmUser(data:any){
   const response = await axios.get( `${BASE_URL}/api/verify-email/${data.id}/${data.hash}?expires=${data.expires}&signature=${data.signature}`,data);

   return response; 
}

export function pwdUser(data:any){
   console.log(data);
   
   return axios.post( BASE_URL + "/api/forgotpass", data);
}
export function resetUserpwd(data:any){
   return axios.post( BASE_URL + "/api/update", data);
}

export function CompanyCreate(data:any){

   return axiosInstance.post("/api/newCompany", data);
}

export function CompShop(data:any){

   return axiosInstance.post("/api/newShop", data);
}
export function Storage(data:any){

   return axiosInstance.post(  "/api/newDepot", data);
}
export function CreateUser(data:any){

   return axiosInstance.post(  "/api/newUser", data);
}

