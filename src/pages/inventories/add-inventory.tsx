import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { useGetAllStore } from "@/features/store/store.service";
import { addInventory } from "@/features/inventory/inventory.service";
import { useGetAllPackage } from "@/features/package/packaging.service";
import Link from "next/link";

export default function StorePage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const { data: storelist, isLoading  } = useGetAllStore();
    const { data: allpackage} = useGetAllPackage();

    async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await addInventory (data)
          console.log(response.data)
            toast.success(' Terminé!', {
                id:toastId
           });
         router.push('/inventories/');
        }
        catch(exception){
            toast.error('Echec ', {
                id:toastId
            });
            console.log(exception)
        }
    }

    return (
        <DashboardLayout>
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer un inventaire</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                <select {...register("package_id")} name="package_id" id="package_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un conditionnement</option>
                    { allpackage !== undefined && allpackage.data.data.map( packages => <option key={packages.id}  value={packages.id}>{packages.package}</option>) }
                    </select>            
               </div>
               <div>
               <select {...register("depot_id")} name="depot_id" id="depot_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un depot</option>
                    { storelist !== undefined && storelist.data.data.map( store => <option key={store.id}  value={store.id}>{store.name}</option>) }
                    </select>  
                    <div className="flex mt-2">
                    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                                    <Link href="/stores/add-store">Ajouter un depot</Link>
                    </button>
                    </div>
          
               </div>
            <div className="w-full mt-4">
                    <input {...register("quantity")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Quantité" aria-label="qte" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("notes")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Note" aria-label="note" />
                </div>

    
                <div className="block items-center justify-between mt-6">
                <button className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Créer
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    </DashboardLayout>
    )
}



