import DashboardLayout from "@/component/Layout";
import { useGetAllShop, useGetAllStoreByShop } from "@/features/shop/shop.service";
import { useDeleteStore, useGetAllStore } from "@/features/store/store.service";
import { Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StorelistPage(){
        const [shopId, setShopId] = useState('');
        const router = useRouter();
        const { data: storelist, isLoading  } = useGetAllStoreByShop(shopId);

        const deleteStore = useDeleteStore();
        const {data: allShop} = useGetAllShop();

        function onDelete(id: string){
            deleteStore.mutate(id)
            router.reload();
        }
        function onSelectShop(value: string){
            setShopId(value)
        }
        
        
return(
 <DashboardLayout>

    <Select
        defaultValue="choisissez un site"
        style={{ width: 200 }}
        onChange={onSelectShop}
    > 
         { allShop !== undefined && allShop.data.data.map(shop => <Select.Option value={shop.id} >{shop.name}</Select.Option>) }
  </Select>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos dépots</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/stores/add_store">+ AJOUTER</Link>
     </button>
     </div>

    <table className="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nom
                </th>
                <th scope="col" className="px-6 py-3">
                   Adresse
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
        { storelist !== undefined && storelist.data.data.map( store =>
                    <tr key={store.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {store.name}
                    </td>
                    <td className="px-6 py-4">
                    {store.adresse}
                    </td>
                    <td className="flex px-6 py-4 text-right">
                        <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                        <Link href={"/stores/edit" + store.id} >Modifier</Link>
                            </button>
                        <button onClick={ () => onDelete(store.id)} className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 ">Supprimer</button>
                    </td>
                </tr>
        )}
        </tbody>
    </table>
</div>
</DashboardLayout>

);

  }