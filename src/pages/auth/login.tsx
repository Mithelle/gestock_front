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
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
    
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Bienvenu</h3>
    
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Connectez vous <b>Ou</b> Creez un compte</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email </label>
                    <input {...register("email")} id="email" type="email" className="input input-bordered w-full max-w-md" />
                </div>
        
                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Mot de passe</label>
                    <input {...register("password")} id="password" type="password" className="input input-bordered w-full max-w-md" />
                </div>
    
                <div className="block items-center justify-between mt-6">
                    <button className="btn btn-primary w-full my-2">
                        Se connecter
                    </button>

                    <Link href="/auth/reset_page" className=" text-center block text-sm text-gray-600 dark:text-gray-200 hover:text-blue-500">Mot de passe oublié?</Link>

                    <div className="block items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">Vous n'avez pas de compte?</span>
                        <Link href="/auth/register" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">S'inscrire</Link>
                    </div>

                </div>
            </form>
        </div>
    
    </div>
    )
}



