import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useGetOneShop, useUpdateShop } from "@/features/shop/shop.service";
import { useEffect } from "react";
import DashboardLayout from "@/component/Layout";
import axiosInstance from "@/utils/axios";


export default function ShopPage() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState:{ errors } } = useForm();

    const { data: oneShop } = useGetOneShop(router.query.shopId)
    const updateShop = useUpdateShop()

    useEffect(() => {
        if(oneShop != undefined) {
            reset({
                name: oneShop?.data?.shop?.name,
                adresse: oneShop?.data?.shop?.adresse,
                tel:oneShop?.data.shop?.tel
            })
        }
    }, [oneShop])

    async function onSubmit(data:any){
        const toastId = toast.loading('En cours...');
        axiosInstance.put('/api/alterShop/' + router.query.shopId, data)
            .then(res => {
                toast.success('Boutique modifiée avec succès!', {
                    id:toastId
                })
                router.back()
            })
            .catch(console.log)
        
        // updateShop.mutate({ ...data, id: router.query.shopId}, {
        //     onSuccess() {
        //         toast.success('Boutique modifiée avec succès!', {
        //             id:toastId
        //         })
        //         router.push('/shops')
        //     }, 
        //     onError() {
        //         toast.error('Echec!', {
        //             id:toastId
        //         })
        //     }
        // })


    }

    return (
        <DashboardLayout title="Nos annexes / Edit">
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
                            <input {...register("tel")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Téléphone" aria-label="phone" />
                        </div>
                        <div className="flex justify-end gap-x-4 mt-6">
                            <button type='button' onClick={() => router.back()} className="btn btn-secondary btn-ghost">
                                    Annuler
                            </button>
                            <button type="submit" className="btn btn-primary">
                                    Modifier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}



