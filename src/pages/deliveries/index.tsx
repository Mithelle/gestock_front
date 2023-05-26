import DashboardLayout from "@/component/Layout";
import Link from "next/link";
import {  useRouter } from "next/router";
import { Button, Table } from "antd";
import { useDeleteDelivery, useGetAllDelivery } from "@/features/delivery/delivery.service";

export default function LivraisonPage(){
    const router = useRouter();
    const { data: deliverylist, isLoading  } = useGetAllDelivery();
    const deleteDelivery = useDeleteDelivery();

    function onDelete(id: string){
        deleteDelivery.mutate(id)
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
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Livraisons</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/deliveries/add-delivery">+ AJOUTER</Link>
     </button>
     </div>

    <Table dataSource={deliverylist?.data.data}>
    <Table.Column title='Code de la livraison' dataIndex={"deliveryCod"} key={"id"} />
    <Table.Column title='Fournisseur' dataIndex={"supplierName"} key={"id"} />
    <Table.Column title='Livreur' dataIndex={"deliveryMan"} key={"id"} />
    <Table.Column title='Adresse' dataIndex={"address"} key={"id"} />
    <Table.Column title='Heure de livraison' dataIndex={"time"} key={"id"} />
    <Table.Column title='N°matricule du vehicule' dataIndex={"numCar"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/deliveries/edit/" + record.id } >Modifier</Button>
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