import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetOneUser, useUpdateUser } from "@/features/user/user.sevice";
import { useGetAllShop } from "@/features/shop/shop.service";

export default function UserCreatingPage() {
    const router = useRouter();
    const { register, reset, handleSubmit, watch, formState:{ errors } } = useForm();

    const { data: oneUser } = useGetOneUser(router.query.userId)
    const updateUser = useUpdateUser()

    const { data: shoplist, isLoading } = useGetAllShop();

   useEffect(() => {
        if(oneUser != undefined) {
            reset({
                name: oneUser?.data?.user?.name,
                email: oneUser?.data?.user?.email,
            })
        }
    }, [oneUser])
   //console.log(shoplist);
   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        updateUser.mutate({ ...data, id: router.query.userId}, {
        onSuccess() {
            toast.success('Utilisateur modifié avec succès!', {
                id:toastId
            })
            router.push('/users')
        }, 
        onError() {
            toast.error('Echec!', {
                id:toastId
            })
        }
    })

}
    
   // if(updateUser.isError) {
    //}

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400"> Modifier </p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
       {/* <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">*/}
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Nom</label>
                <input {...register("name")} id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email </label>
                <input {...register("email")} id="email" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            {/*<div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Mot de passe</label>
                <input {...register("password")} id="password" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password_confirmation">Confirmer mot de passe</label>
                <input {...register("password_confirmation")} id="password_confirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
    </div>
        </div>*/}

        <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="annexe">Annexes</label>
                {<select {...register("shop_id")} name="shop_id" id="shop_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">*choisissez un site*</option>
                    { shoplist !== undefined && shoplist.data.data.map( shop => <option key={shop.id}  value={shop.id}>{shop.name}</option>) }
                </select> 
                }           
        </div>
        <div className="block items-center justify-between mt-6">
                <button className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Modifier
                </button>
        </div>
    </form>
    </div>
    
    </div>
    )
}



