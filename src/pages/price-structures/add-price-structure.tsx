import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { useState } from "react";
import { useGetAllProduct } from "@/features/Product/product.service";
import { useGetAllPackageByProduct } from "@/features/package/packaging.service";

export default function AddPricePage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const {data: productlist, isLoading } = useGetAllProduct();
    const [productId, setProductId] = useState();
    const {data: packagelist } = useGetAllPackageByProduct(productId);
    // const [selected, setSelected] = useState('');

   async function onSubmit(data:any){
        //const toastId = toast.loading('En cours...');
        console.log(data);
    } 
    

    function handleSelectedChange(e){
        setProductId(e.target.value);
    }
        
   // console.log(packagelist);
    return (
        <DashboardLayout>

        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer une structure de prix</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
                {
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="annexe">Produit</label>
                <select onChange={handleSelectedChange} name="product_id" id="product_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez le produit</option>
                    {productlist !== undefined && productlist.data.data.map( product => <option key={product.id}  value={product.id}>{product.name}</option>)}
                    </select>  
                { packagelist?.data.data.map((conditions: any, setProductId: any) =>
                    <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 border border-color:black">
                        <div>
                            <label htmlFor="conditions" className="text-gray-700 dark:text-gray-200">Conditionnement</label>
                            <input value={conditions.package} {...register(`conditions.${setProductId}.package`) } type="number" min={0} name="package" id="package" className="block w-full px-2 py-1 mt-1 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>
                        <div>
                            <label htmlFor="priceU" className="text-gray-700 dark:text-gray-200">Prix unitaire</label>
                            <input {...register(`conditions.${setProductId}.priceU`) } min={0} type="number" name="priceU" id="priceU" className="block w-full px-2 py-1 mt-1 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>
                        <div>
                            <label htmlFor="priceMin" className="text-gray-700 dark:text-gray-200">prix Minimal</label>
                            <input {...register(`conditions.${setProductId}.priceMin`) } min={0} type="number" name="priceMin" id="priceMin" className="block w-full px-2 py-1 mt-1 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>
                        <div>
                            <label htmlFor="priceMax" className="text-gray-700 dark:text-gray-200">prix Maximal</label>
                            <input {...register(`conditions.${setProductId}.priceMax`) } min={0} type="number" name="priceMax" id="priceMax" className="block w-full px-2 py-1 mt-1 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>
                        <div>
                            <label htmlFor="type" className="text-gray-700 dark:text-gray-200">Type de réduction</label>
                            <select name="reduc" id="reduc" className="block  px-2 py-1 mt-1 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                            <option value="percent">En pourcentage</option>
                            <option value="amount">Sur montant</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="reduction" className="text-gray-700 dark:text-gray-200">Réduction</label>
                            <input {...register(`conditions.${setProductId}.redution`) } min={0} type="number" name="reduction" id="reduction" className="block w-full px-2 py-1 mt-1 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"/>
                        </div>
                    </div>
                )}
            </div>
        }
                 <div className="block items-center justify-between mt-6">
                <button className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Créer
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    
    </DashboardLayout>
    );
}

