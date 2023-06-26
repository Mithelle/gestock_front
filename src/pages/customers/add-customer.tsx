import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { addCustomer } from "@/features/customer/customer.service";
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useState } from "react";

export default function AddCustomerPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const [phone,setPhone] = useState();



   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await addCustomer (data)
          console.log(response.data)
            toast.success('Terminé!', {
                id:toastId
           });
         router.push('/customers/');
        }
        catch(exception){
            toast.error('Echec', {
                id:toastId
            });
            console.log(exception)
        }
    } 

    function onPhoneInput(value){
        setPhone(value);
    }
    /*function handleValidate(event){
    const isValid = isValidPhoneNumber(event.target.value); 
        console.log({ isValid })
    }*/
    return (
        <DashboardLayout title="Clients / Créer">

        <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("name")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Nom du client" aria-label="name" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("email")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email" aria-label="email" />
                </div>
                <div className="w-full mt-4">
                   {/*<Controller control={control} rules={{validate: (isValid) => handleValidate(isValid)}}
                    />*/}
                    <PhoneInput {...register("tel")}   value={phone} onChange={onPhoneInput} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Téléphone" aria-label="phone" />
                </div>
                <div className="block items-center justify-between mt-6">
                <button className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Créer
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    </DashboardLayout>

    )
}



