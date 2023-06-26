import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetOneStore, useUpdateStore } from "@/features/store/store.service";
import { useGetAllShop } from "@/features/shop/shop.service";
import { ShopLayout } from "@/component/layout/shop-layout";
import axiosInstance from "@/utils/axios";

export default function StorePage() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState:{ errors } } = useForm();
    const { data: shoplist, isLoading  } = useGetAllShop();

    const { data: oneStore } = useGetOneStore(router.query.storeId);
    const updateStore = useUpdateStore();
    
    //const allShop = useGetAllShop();
    //console.log(allShop);
    //const { data: oneShop } = useGetOneShop(router.query.shopId)
    //const [shopList, setShopList] = useState();

    useEffect(() => {
        if(oneStore != undefined) {
            reset({
                name: oneStore?.data?.depot?.name,
                adresse: oneStore?.data?.depot?.adresse
             // shop.name: oneShop?.data.shop?.tel
            })
        }
    }, [oneStore])

   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
    axiosInstance.put('/api/alterDepot/' + router.query.storeId, data)
        .then(() => {
            toast.success('Dépôt modifié avec succès!', {
                id:toastId
            })
            router.back();
        })
        .catch(console.log)
        
    }

    
    return (
        <ShopLayout title="Nos annexes / Dépots / Modifier">

        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400"> Modifier </p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("name")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Nom du dépôt" aria-label="name" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("adresse")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Adresse" aria-label="Address" />
                </div>
                <div>
                <select {...register("shop_id")} name="shop_id" id="shop_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">*choisissez un site*</option>
                    { shoplist !== undefined && shoplist.data.data.map( shop => <option key={shop.id}  value={shop.id}>{shop.name}</option>) }
                    </select>            
               </div>

    
                <div className="block items-center justify-between mt-6">
                <button className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    </ShopLayout>

    )
}


