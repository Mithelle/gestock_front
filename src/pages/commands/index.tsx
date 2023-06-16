import DashboardLayout from "@/component/Layout";
import Link from "next/link";
import {  useRouter } from "next/router";
import { Button, Table } from "antd";
import { useDeleteCommand, useGetAllCommand } from "@/features/command/command.service";

export default function CommandlistPage(){
    const router = useRouter();
    const { data: commandlist, isLoading  } = useGetAllCommand();
    const deleteCommand = useDeleteCommand();

    function onDelete(id: string){
        deleteCommand.mutate(id)
        router.reload();
    }

    if(isLoading) {
        return <div className="text-center">Loading...</div> 
    }
    
return(
    <DashboardLayout>

    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Commandes</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/commands/add-command">+ AJOUTER</Link>
     </button>
     </div>

    <Table dataSource={commandlist?.data.data}>
    <Table.Column title="Date de la commande" dataIndex={"date"} key={"id"} />
    <Table.Column title='Fournisseur' dataIndex={"name"} key={"id"} />
    <Table.Column title='Conditionnement' dataIndex={"package"} key={"id"} />
    <Table.Column title='Quantité' dataIndex={"quantity"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/commands/edit/" + record.id } >Modifier</Button>
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