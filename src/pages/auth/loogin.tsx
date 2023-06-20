import { loginUser } from "@/features/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import Link from "next/link";
//import { useRef,useState,useEffect } from "react";

export default function LoginPage() {

    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();

   async function onSubmit(data:any){
    const toastId = toast.loading('Patientez...');
        try{
         const response =  await loginUser(data)
          console.log(response.data)
          Cookies.set('token', response.data.access_token)

            toast.success('Connecté avec succès!', {
                id:toastId
           });
         router.push('/admin');
        }
        catch(exception){
            toast.error('Connexion impossible', {
                id:toastId
            });
            console.log(exception)
        }
    }



    
    return (
<div className="bg-gray-100 min-h-screen flex items-center justify-center w-full max-w-sm mx-auto overflow-hidden rounded-lg">
<div className="absolute inset-0 z-0">
        <video autoPlay muted controls loop className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
    <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
      type="video/mp4" />
    Your browser does not support the video tag.
  </video>
    </div>

    <div className="h-screen flex items-center justify-center">
      <div
        className="bg-gray-300 bg-opacity-40 backdrop-blur-lg px-12 py-10 rounded-md border"
      >
        <h2 className="text-3xl text-center mb-5 font-semibold">Bienvenu</h2>
        <p className="mt-1 text-center text-gray-700 dark:text-gray-400">connectez vous <b>Ou</b> creez un compte</p>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div>
                    {/* <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email </label> */}
                    <input {...register("email")} id="email" type="email" className="input input-bordered bg-inherit placeholder-gray-300 w-full mt-4" placeholder="Email" />
                </div>
                <div>
                    {/* <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Mot de passe</label> */}
                    <input {...register("password")} id="password" type="password" className="input input-bordered bg-inherit placeholder-gray-300 w-full mt-2" placeholder="Mot de passe"/>
                </div>
        <div className="flex items-center justify-between text-xs mb-6 mt-4">
          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>se souvenir de moi</p>
          </div>
          <a href="#" className="text-blue-500">Mot de passe oublié?</a>
        </div>
        <div
          className="bg-gray-300 hover:bg-gray-400 rounded-md text-black py-2 text-center mb-5 font-semibold"
        >
          Se connecter
        </div>
        
        <div className="text-sm text-center">
          Don't have an account? <a href="#" className="text-blue-500">Register</a>
        </div>
        </form>
        </div>
      </div>
    </div>
   );
}



