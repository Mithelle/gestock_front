import DashboardLayout from "@/component/Layout";
import { Loading } from "@/component/loading";
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
        return <Loading /> 
    }
    console.log(customerlist);
    
return(
    <DashboardLayout title="Clients">

    
<div className="relative overflow-x-auto sm:rounded-lg">
    <div className="flex justify-end mt-2 my-6">
        <button className="btn btn-primary ">
            <Link href="/customers/add-customer">+ AJOUTER</Link>
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