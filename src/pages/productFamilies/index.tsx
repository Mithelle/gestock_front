import DashboardLayout from "@/component/Layout";
import { useDeleteProductFamily, useGetAllProductFamily } from "@/features/productFamily/productFamily.service";
import { Button, Table } from "antd";
import Link from "next/link";
import {  useRouter } from "next/router";

export default function ProductFamilylistPage(){
    const router = useRouter();
    const { data: productFamilylist, isLoading  } = useGetAllProductFamily();
    const deleteProductFamily = useDeleteProductFamily();

    function onDelete(id: string){
        deleteProductFamily.mutate(id)
        router.reload();
    }

    if(isLoading) {
        return <div className="text-center">Loading...</div>
    }
   // console.log(productFamilylist)
    
return(
    <DashboardLayout>

    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos familles de produit</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/productFamilies/add-proFam">+ AJOUTER</Link>
     </button>
     </div>

<Table dataSource={productFamilylist?.data.data}>
    <Table.Column title='Référence' dataIndex={"ref"} key={"id"} />
    <Table.Column title='Nom' dataIndex={"name"} key={"id"} />
    <Table.Column title='Description' dataIndex={"description"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/productFamilies/edit/" + record.id } >Modifier</Button>
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