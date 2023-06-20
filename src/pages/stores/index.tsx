import DashboardLayout from "@/component/Layout";
import { useGetAllShop, useGetAllStoreByShop } from "@/features/shop/shop.service";
import { useDeleteStore, useGetAllStore } from "@/features/store/store.service";
import { Button, Select, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StorelistPage(){
        const [shopId, setShopId] = useState('');
        const router = useRouter();
        const { data: storelist } = useGetAllStoreByShop(shopId);
        const { data: allStore } = useGetAllStore();

        const {data: allShop} = useGetAllShop();
        
        const deleteStore = useDeleteStore();
        function onDelete(id: string){
            deleteStore.mutate(id)
            router.reload();
        }
        function onSelectShop(value: string){
            setShopId(value)
        }
        
        console.log(allStore);
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
                    <Link href="/stores/add-store">+ AJOUTER</Link>
     </button>
     </div>

<Table dataSource={allStore?.data.data}>
    <Table.Column title='Nom' dataIndex={"name"} key={"id"} />
    <Table.Column title='Adresse' dataIndex={"adresse"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/stores/edit/" + record.id } >Modifier</Button>
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