import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useGetAllShop } from "@/features/shop/shop.service";
import DashboardLayout from "@/component/Layout";
import { Storage } from "@/features/store/store.service";
import { useGetAllProductFamily } from "@/features/productFamily/productFamily.service";
import { addProduct } from "@/features/Product/product.service";

export default function AddProductPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const { data: productFamilylist, isLoading  } = useGetAllProductFamily();

    async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await addProduct (data)
          console.log(response.data)
            toast.success(' Terminé!', {
                id:toastId
           });
         router.push('/products/');
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
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Creer un produit</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("name")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Nom du produit" aria-label="name" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("ref")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Référence" aria-label="ref" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("dateP")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="date" placeholder="Date de péremption" aria-label="dateP" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("Pu")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="number" placeholder="Prix Unitaire" aria-label="Pu" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("qte")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="number" placeholder="Quantité en stock" aria-label="name" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("fournisseur")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Fournisseur" aria-label="fournisseur" />
                </div>
                <div>
                <select {...register("productFamily_id")} name="productFamily_id" id="productFamily_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">*choisissez un site*</option>
                    { productFamilylist !== undefined && productFamilylist.data.data.map( productFamily => <option key={productFamily.id}  value={productFamily.id}>{productFamily.name}</option>) }
                    </select>            
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



