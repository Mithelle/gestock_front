import DashboardLayout from "@/component/Layout";
import { useDeleteInvoice, useGetAllInvoice } from "@/features/invoice/invoice.service";
import { Button, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

export default function InvoicelistPage(){
        const router = useRouter();
        const {data: allInvoice } = useGetAllInvoice();

        const deleteInvoice = useDeleteInvoice();
        function onDelete(id: string){
            deleteInvoice.mutate(id)
            router.reload();
        }
          
return(
 <DashboardLayout>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos factures</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/packages/add-package">+ AJOUTER</Link>
     </button>
     </div>

<Table dataSource={allInvoice?.data.data}>
<Table.Column title='Client' dataIndex={"customer_id"} key={"id"} />
<Table.Column title='Facture n°' dataIndex={"InvoiceCod"} key={"id"} />
<Table.Column title='Date de la facture' dataIndex={"invoiceDat"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                              <Button type="link" href={"/invoices/visit/" + record.id } >Voir</Button> 
                             <Button type="link" href={"/invoices/edit/" + record.id } >Modifier</Button>
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