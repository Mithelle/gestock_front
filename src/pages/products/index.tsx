import DashboardLayout from "@/component/Layout";
import { useDeleteProduct } from "@/features/Product/product.service";
import { useGetAllProductByProductFamily, useGetAllProductFamily } from "@/features/productFamily/productFamily.service";
import { Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductlistPage(){
        const [proFamId, setProFamId] = useState('');
        const router = useRouter();
        const { data: productlist, isLoading  } = useGetAllProductByProductFamily(proFamId);

        const deleteProduct = useDeleteProduct();
        const {data: allProductFamily} = useGetAllProductFamily();

        function onDelete(id: string){
            deleteProduct.mutate(id)
            router.reload();
        }
        function onSelectProductFamily(value: string){
            setProFamId(value)
        }
        
        
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
                    <Link href="/products/add_product">+ AJOUTER</Link>
     </button>
     </div>

    <table className="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Reference
                </th>
                <th scope="col" className="px-6 py-3">
                    Nom
                </th>
                <th scope="col" className="px-6 py-3">
                   Description
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
        { productlist !== undefined && productlist.data.data.map( product =>
                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.ref}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.description}
                    </td>
                    <td className="flex px-6 py-4 text-right">
                        <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                        <Link href={"/products/edit" + product.id} >Modifier</Link>
                            </button>
                        <button onClick={ () => onDelete(product.id)} className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 ">Supprimer</button>
                    </td>
                </tr>
        )}
        </tbody>
    </table>
</div>
</DashboardLayout>

);

  }