import DashboardLayout from "@/component/Layout";
import { useGetAllProduct } from "@/features/product/product.service";
import { useDeletePackage, useGetAllPackageByProduct } from "@/features/package/packaging.service";
import { Button, Select, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PackagelistPage(){
    const [productId, setProductId] = useState('');
        const router = useRouter();
        const { data: packagelist } = useGetAllPackageByProduct(productId);
        const {data: allProduct } = useGetAllProduct();
        //const { data: measurelist } = useGetAllMeasureByProduct(productId);

        const deletePackage = useDeletePackage();
        function onDelete(id: string){
            deletePackage.mutate(id)
            router.reload();
        }
        function onSelectProduct(value: string){
            setProductId(value)
         }
          
     // console.log(packagelist);
return(
 <DashboardLayout>

    <Select
        defaultValue="choisissez un produit"
        style={{ width: 200 }}
        onChange={onSelectProduct}
    > 
         { allProduct !== undefined && allProduct.data.data.map(product => <Select.Option value={product.id} >{product.name}</Select.Option>) }
  </Select>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos conditionnements</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/packages/add-package">+ AJOUTER</Link>
     </button>
     </div>

<Table dataSource={packagelist?.data.data}>
    <Table.Column title='Conditionnement' dataIndex={"package"} key={"id"} />
    {/*<Table.Column title='Unité de mesure' dataIndex={measurelist?.data.data} key={"id"} />*/}
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                            {/*   <Button type="link" href={"/stores/edit/" + record.id } >Modifier</Button>  */}
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