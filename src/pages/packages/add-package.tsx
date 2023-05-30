import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { useGetAllProduct } from "@/features/Product/product.service";
import { addPackage } from "@/features/package/packaging.service";
import { useGetAllMeasure } from "@/features/measure/measure.service";

export default function addPackagePage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const { data: productlist, isLoading  } = useGetAllProduct();
    const { data: measurelist } = useGetAllMeasure();

    async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await addPackage(data)
          console.log(response.data)
            toast.success(' Terminé!', {
                id:toastId
           });
         router.push('/packages');
        }
        catch(exception){
            toast.error('Echec ', {
                id:toastId
            });
            console.log(exception)
        }
    }
        // console.log(measurelist);
    return (
        <DashboardLayout>
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer un conditionnement</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <select {...register("product_id")} name="product_id" id="product_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un produit</option>
                    { productlist !== undefined && productlist.data.data.map( product => <option key={product.id}  value={product.id}>{product.name}</option>) }
                    </select>            
               </div>
               <div>
                <select {...register("measure_id")} name="measure_id" id="measure_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez une unité de mesure</option>
                    { measurelist !== undefined && measurelist.data.data.map( measure => <option key={measure.id}  value={measure.id}>{measure.unit}</option>) }
                    </select>            
               </div>
                <div className="w-full mt-4">
                    <label htmlFor="condition" className="text-gray-700 dark:text-gray-200">Conditionnement</label>
                    <input {...register("package")} min={0} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="number"  />
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



