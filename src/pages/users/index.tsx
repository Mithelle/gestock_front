import Link from "next/link";
import React, { useState } from "react";
import { useDeleteUser, useGetAllUser } from "@/features/user/user.sevice";
import { useGetAllShop } from "@/features/shop/shop.service";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { Select } from "antd";


export default function UserlistPage(){
    const [shopId, setShopId] = useState('');
    const router = useRouter();
    const { data: userlist, isLoading } = useGetAllUser();
  const {data: allShop} = useGetAllShop();
    const deleteUser = useDeleteUser();

    function onDelete(id: any){
        deleteUser.mutate(id)
        router.reload();
    }
    function onSelectShop(value: string){
        setShopId(value)
    }


    /*if(isLoading) {
        return <div className="text-center">Loading...</div> 
    }

    console.log(userlist)*/
    

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
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos utilisateurs</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/users/add_user">+ AJOUTER</Link>
     </button>
     </div>

    <table className="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nom
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Site
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {userlist?.data.data.map(user => 
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {user.name}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.email}
                        </td>
            {/*allShop?.data.data.map(shop =>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {shop.name}
                        </td>
            )*/}
                        <td className="flex px-6 py-4 text-right">
                            <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 "> 
                            <Link href={"/users/edit" + user.id} >Modifier</Link>
                            </button>
                            <button onClick={ () => onDelete(user.id)} className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 ">Supprimer</button>
                        </td>
                    </tr>
        
        )}            
        </tbody>
    </table>
</div>
</DashboardLayout>
);


}