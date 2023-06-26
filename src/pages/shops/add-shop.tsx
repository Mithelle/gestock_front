import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { CompShop } from "@/features/shop/shop.service";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from "react";

export default function AddShopPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const [phone,setPhone] = useState<string>();



   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await CompShop ({...data, tel: phone})
          console.log(response.data)
            toast.success('Terminé!', {
                id:toastId
           });
         router.push('/shops/');
        }
        catch(exception){
            toast.error('Echec', {
                id:toastId
            });
            console.log(exception)
        }
    } 
    
    function onPhoneInput(value: string){
        setPhone(value);
    }

    
    return (
        <DashboardLayout title="Nos annexes">

        <div className=" w-full h-full overflow-hidden rounded-lg flex items-center justify-center">
        <div className="w-full max-w-lg px-6 py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mt-4">
                    <input {...register("name")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Nom de l'annexe" aria-label="name" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("adresse")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Adresse" aria-label="Address" />
                </div>
                <div className="w-full mt-4">
                <PhoneInput {...register("tel")}   value={phone} onChange={onPhoneInput} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Téléphone" aria-label="phone" />
                </div>
                <div className="flex justify-end gap-x-4 mt-6">
                    <button type='button' onClick={() => router.back()} className="btn btn-secondary btn-ghost">
                            Annuler
                    </button>
                    <button className="btn btn-primary">
                            Créer
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    </DashboardLayout>

    )
}



