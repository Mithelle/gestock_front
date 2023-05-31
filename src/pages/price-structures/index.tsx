import DashboardLayout from "@/component/Layout";
import Link from "next/link";
import {  useRouter } from "next/router";
import { Button, Select, Table } from "antd";
import { useDeletePrice, useGetAllPrice } from "@/features/price-structure/price-structure.service";
import { useGetAllPriceByProduct, useGetAllProduct } from "@/features/Product/product.service";
import { useState } from "react";

export default function PricelistPage(){
    const router = useRouter();
    const deletePrice = useDeletePrice();
    const { data: allProduct } = useGetAllProduct();
    const [productId, setProductId] = useState('');
    const { data: pricelist, isLoading  } = useGetAllPriceByProduct(productId);
    
    function onDelete(id: string){      
        deletePrice.mutate(id)
        router.reload();
    }

    if(isLoading) {
        return <div className="text-center">Loading...</div> 
    }
   // console.log(pricelist)

   function onSelectProduct(value: string){
    setProductId(value);
    }

return(
    <DashboardLayout>

<Select
        defaultValue="choisissez un product"
        style={{ width: 200 }}
        onChange={onSelectProduct}
    > 
         { allProduct !== undefined && allProduct.data.data.map(product => <Select.Option value={product.id} >{product.name}</Select.Option>) }
  </Select>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Notre structure de prix</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/price-structures/add-price-structure">+ AJOUTER</Link>
     </button>
     </div>

    <Table dataSource={pricelist?.data.data}>
    <Table.Column title='Conditionnement' dataIndex={"package"} key={"id"} />
    <Table.Column title='Prix Unitaire' dataIndex={"priceU"} key={"id"} />
    <Table.Column title='Prix Minimal' dataIndex={"priceMin"} key={"id"} />
    <Table.Column title='Prix Maximal' dataIndex={"priceMax"} key={"id"} />
    <Table.Column title='Réduction' dataIndex={"reduction"} key={"id"} />
    <Table.Column title='Action'  
                    render={(value, record: any) =>{
                        return <>
                               <Button type="link" href={"/priceStructures/edit/" + record.id } >Modifier</Button>
                               <Button type="link" onClick={ () => onDelete(value)}>Supprimer</Button>
                             switch here  <Button type="link" >Supprimer</Button>
                             <Button type="link" href={"/priceStructures/visit /" + record.id } >Voir</Button>
                        </>
                       
                    }}
                    dataIndex={"id"}
                    key={"id"} />
    </Table>
</div>
</DashboardLayout>

);


}