import DashboardLayout from "@/component/Layout";
import { useDeleteProduct } from "@/features/Product/product.service";
import { useGetAllProductByProductFamily, useGetAllProductFamily } from "@/features/productFamily/productFamily.service";
import { Button, Select, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductlistPage(){
        const [proFamId, setProFamId] = useState('');
        const router = useRouter();
        const { data: productlist  } = useGetAllProductByProductFamily(proFamId);

        const deleteProduct = useDeleteProduct();
        const {data: allProductFamily} = useGetAllProductFamily();

        function onDelete(id: string){
            deleteProduct.mutate(id)
            router.reload();
        }
        function onSelectProductFamily(value: string){
            setProFamId(value)
        }
        console.log(productlist);
        
return(
 <DashboardLayout>

    <Select
        defaultValue="choisissez une famille"
        style={{ width: 200 }}
        onChange={onSelectProductFamily}
    > 
         { allProductFamily !== undefined && allProductFamily.data.data.map(productFamily => <Select.Option value={productFamily.id} >{productFamily.name}</Select.Option>) }
  </Select>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos Produits</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/products/add-product">+ AJOUTER</Link>
     </button>
     </div>

<Table dataSource={productlist?.data.data}>
<Table.Column title='Référence' dataIndex={"ref"} key={"id"} />
    <Table.Column title='Nom' dataIndex={"name"} key={"id"} />
    <Table.Column title='Description' dataIndex={"description"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/products/edit/" + record.id } >Modifier</Button>
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