import DashboardLayout from "@/component/Layout";
import { useDeleteShop, useGetAllShop } from "@/features/shop/shop.service";
import Link from "next/link";
import {  useRouter } from "next/router";
import { Button, Table } from "antd";

export default function LivraisonPage(){
    const router = useRouter();
    const { data: livraisonlist, isLoading  } = useGetAllLivraison();
    const deleteShop = useDeleteShop();

    function onDelete(id: string){
        deleteShop.mutate(id)
        router.reload();
    }

    if(isLoading) {
        return <div className="text-center">Loading...</div> 
    }
   // console.log(shoplist)
    
return(
    <DashboardLayout>

    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos annexes</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/shops/add-shop">+ AJOUTER</Link>
     </button>
     </div>

    <Table dataSource={shoplist?.data.data}>
    <Table.Column title='Nom' dataIndex={"name"} key={"id"} />
    <Table.Column title='Adresse' dataIndex={"adresse"} key={"id"} />
    <Table.Column title='Téléphone' dataIndex={"tel"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/shops/edit/" + record.id } >Modifier</Button>
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