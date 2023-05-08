import DashboardLayout from "@/component/Layout";
import { useDeleteCustomer, useGetAllCustomer } from "@/features/customer/customer.service";
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
    console.log(customerlist)
    
return(
    <DashboardLayout>

    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex mt-2">
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Nos clients</h3>
    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    <Link href="/customers/add_customer">+ AJOUTER</Link>
     </button>
     </div>

    <table className="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    Nom
                </th>
                <th scope="col" className="px-6 py-3">
                    Prenom
                </th>
                <th scope="col" className="px-6 py-3">
                    Sexe
                </th>
                <th scope="col" className="px-6 py-3">
                   Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Téléphone
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {customerlist?.data.data.map( customer =>
                    <tr key={customer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {customer.name}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {customer.surname}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {customer.sex}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {customer.email}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {customer.tel}
                    </td>
                    <td className="flex px-6 py-4 text-right">
                        <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">  
                     < Link href={"/customers/edit/" + customer.id }  >Modifier</Link>
                            </button>
                        <button onClick={ () => onDelete(customer.id)} className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 ">Supprimer</button>
                    </td>
                </tr>
    
            )}
           </tbody> 
    </table>
</div>
</DashboardLayout>

);


}