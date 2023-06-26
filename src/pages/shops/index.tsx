import DashboardLayout from "@/component/Layout";
import { useDeleteShop, useGetAllShop } from "@/features/shop/shop.service";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import {  useRouter } from "next/router";
import { ShopLayout } from "@/component/layout/shop-layout";

export default function ShoplistPage(){
    const router = useRouter();
    const { data: shoplist, isLoading, refetch  } = useGetAllShop();
    const deleteShop = useDeleteShop();

    function onDelete(id: string){
        axiosInstance.delete('/api/delShop/' + id)
            .then(() => {
                refetch()
            }).catch(e => console.error(e))
    }

    if(isLoading) {
        return <div className="text-center">Loading...</div> 
    }
   // console.log(shoplist)
    
return(
    <ShopLayout title="Nos annexes">

    
    <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="flex mt-12 mb-4">
            <button className="btn btn-primary ml-auto">
                            <Link href="/shops/add-shop">+ AJOUTER</Link>
            </button>
        </div>

    <div className="bg-white rounded-md">
   <table className="table">
        <thead>
            <tr>
                <th scope="col">
                    Nom
                </th>
                <th scope="col">
                   Adresse
                </th>
                <th scope="col">
                    Téléphone
                </th>
                <th scope="col">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {shoplist?.data.data.map( shop =>
                    <tr key={shop.id} className="">
                    <td scope="row" className="">
                        {shop.name}
                    </td>
                    <td className="">
                          {shop.adresse}
                    </td>
                    <td className="">
                        {shop.tel}
                    </td>
                    <td className=" space-x-2">
                        <button className="btn btn-ghost">
                            < Link href={"/shops/edit/" + shop.id }  >Modifier</Link>
                        </button>
                        <button  onClick={() => onDelete(shop.id)} className="btn btn-danger">Supprimer</button>
                    </td>
                </tr>
    
            )}
           </tbody> 
    </table>
    </div>

</div>
</ShopLayout>

);


}