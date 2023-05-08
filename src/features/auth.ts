import axios from "axios";

export const BASE_URL = 'http://localhost:8000';

export function createAccount(data:any){
   return axios.post( BASE_URL + "/api/register", data);
}

export function me(){
   return axios.get( BASE_URL + "/api/me");
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

