import Link from "next/link";
import React, { useState } from "react";
import { useDeleteUser, useGetAllUser } from "@/features/user/user.sevice";
import { useGetAllShop, useGetAllUserByShop } from "@/features/shop/shop.service";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { Button, Select, Table } from "antd";


export default function UserlistPage(){
    const [shopId, setShopId] = useState('');
    const router = useRouter();
    const { data: userlist, isLoading } = useGetAllUserByShop(shopId);
    const {data: allShop} = useGetAllShop();
    
    const deleteUser = useDeleteUser();

    function onDelete(id: any){
        deleteUser.mutate(id)
        router.reload();
    }
    function onSelectShop(value: string){
        setShopId(value)
    }

    //console.log(userlist)
    

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
                    <Link href="/users/add-user">+ AJOUTER</Link>
     </button>
     </div>

<Table dataSource={userlist?.data.data}>
    <Table.Column title='Nom' dataIndex={"name"} key={"id"} />
    <Table.Column title='Email' dataIndex={"email"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/users/edit/" + record.id } >Modifier</Button>
                               <Button type="link" onClick={ () => onDelete(value)}>Supprimer</Button>
                        </>
                       
                    }}
                    dataIndex={"id"}
                    key={"id"} />
    </Table>

</div>
</DashboardLayout>
);


}