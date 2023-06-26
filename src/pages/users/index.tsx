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
    const { data: allUserList } = useGetAllUser();
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
 <DashboardLayout title="Employés">


<div className="relative overflow-x-auto sm:rounded-lg">
    <div className="flex items-center justify-between my-6">
        <Select
            defaultValue="choisissez un site"
            style={{ width: 200 }}
            onChange={onSelectShop}
        > 
            { allShop !== undefined && allShop.data.data.map(shop => <Select.Option value={shop.id} >{shop.name}</Select.Option>) }
        </Select>
            <button className="btn btn-primary">
                    <Link href="/users/add-user">+ AJOUTER</Link>
            </button>
     </div>

<Table dataSource={ shopId ? userlist?.data.data : allUserList?.data.data }>
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