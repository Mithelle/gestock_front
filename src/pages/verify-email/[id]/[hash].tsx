import { confirmUser, loginUser } from "@/features/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
//import { useRef,useState,useEffect } from "react";

export default function ConfirmPage() {
    const router = useRouter();
    const {signature, expires, id, hash} = router.query

    async function onSubmit(data:any){
            try{
             const response =  await confirmUser(data)
              console.log(response.data)
            }
            catch(exception){
                console.log(exception)
            }
        }
    
    useEffect(()=>{
        if (signature && expires && id && hash) {
           console.log("comme moi");
           
            onSubmit({
                id:id,
                hash:hash,
                signature:signature,
                expires:expires
            })
        }
    },[signature, expires, id, hash])
    

    
}



