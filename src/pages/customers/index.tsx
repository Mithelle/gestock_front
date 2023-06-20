import DashboardLayout from "@/component/Layout";
import { useDeleteCustomer, useGetAllCustomer } from "@/features/customer/customer.service";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import Link from "next/link";
import {  useRouter } from "next/router";

export default function CustomerlistPage(){
    const router = useRouter();
    const { data: customerlist, isLoading  } = useGetAllCustomer();
    const deleteCustomer = useDeleteCustomer();

    function onDelete(id: string){
        deleteCustomer.mutate(id)
        router.reload();
    }

    if(isLoading) {
        return <div className="text-center">Loading...</div> 
    }
    console.log(customerlist);
    
return(
    <DashboardLayout>

    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos clients</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/customers/add-customer"><PlusOutlined /> AJOUTER</Link>
     </button>
     </div>

<Table dataSource={customerlist?.data.data}>
    <Table.Column title='Nom' dataIndex={"name"} key={"id"} />
    <Table.Column title='Email' dataIndex={"email"} key={"id"} />
    <Table.Column title='Téléphone' dataIndex={"tel"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/customers/edit/" + record.id } >Modifier</Button>
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