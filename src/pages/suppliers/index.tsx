import DashboardLayout from "@/component/Layout";
import { useDeleteSupplier, useGetAllSupplier } from "@/features/supplier/supplier.service";
import Link from "next/link";
import {  useRouter } from "next/router";

export default function SupplierlistPage(){
    const router = useRouter();
    const { data: supplierlist, isLoading  } = useGetAllSupplier();
    const deleteSupplier = useDeleteSupplier();

    function onDelete(id: string){
        deleteSupplier.mutate(id)
        router.reload();
    }

    if(isLoading) {
        return <div className="text-center">Loading...</div> 
    }
    console.log(supplierlist)
    
return(
    <DashboardLayout>

    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos fournisseurs</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/suppliers/add_supplier">+ AJOUTER</Link>
     </button>
     </div>

    <table className="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nom
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                   Adresse
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {supplierlist?.data.data.map( supplier =>
                    <tr key={supplier.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {supplier.name}
                    </td>
                    <td className="px-6 py-4">
                        {supplier.email}
                    </td>
                    <td className="px-6 py-4">
                          {supplier.adresse}
                    </td>
                    <td className="flex px-6 py-4 text-right">
                        <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">  
                     < Link href={"/suppliers/edit/" + supplier.id }  >Modifier</Link>
                            </button>
                        <button onClick={ () => onDelete(supplier.id)} className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 ">Supprimer</button>
                    </td>
                </tr>
    
            )}
           </tbody> 
    </table>
</div>
</DashboardLayout>

);


}