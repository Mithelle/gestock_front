import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useGetAllShop } from "@/features/shop/shop.service";
import DashboardLayout from "@/component/Layout";
import { Storage } from "@/features/store/store.service";
import Link from "next/link";
import { ShopLayout } from "@/component/layout/shop-layout";

export default function StorePage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const { data: shoplist, isLoading  } = useGetAllShop();

    async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await Storage(data);
          console.log(response.data)
            toast.success(' Terminé!', {
                id:toastId
           });
         router.back(); 
        }
        catch(exception){
            toast.error('Echec ', {
                id:toastId
            });
            console.log(exception)
        }
    }

    return (
        <ShopLayout title="Nos Annexes / Dépôts / Créer">
        <div className="w-full  h-full flex items-center justify-center overflow-hidden ">
        <div className="px-6 py-4 w-full max-w-md">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer un dépot</p>
    
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="w-full mt-4">
                    <input {...register("name")} className="input input-bordered w-full max-w-xl" type="text" placeholder="Nom du dépôt" aria-label="name" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("adresse")} className="input input-bordered w-full max-w-xl" type="text" placeholder="Adresse" aria-label="Address" />
                </div>
                <div>
                <select {...register("shop_id")} name="shop_id" id="shop_id" className="input input-bordered w-full max-w-xl">
                    <option value="">*choisissez un site*</option>
                    { shoplist !== undefined && shoplist.data.data.map(shop => <option key={shop.id}  value={shop.id}>{shop.name}</option>) }
                    </select> 
               </div>
    
                <div className="block items-center justify-between mt-6">
                <button className="btn btn-primary w-full" >
                        Créer
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    </ShopLayout>
    )
}



