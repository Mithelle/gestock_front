import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { addSupply } from "@/features/supply/supply.service";
import { useGetAllSupplier } from "@/features/supplier/supplier.service";
import { useGetAllProduct } from "@/features/Product/product.service";
import { useState } from "react";
import { useGetAllPackageByProduct } from "@/features/package/packaging.service";

export default function AddSupplyPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const [productId, setProductId] = useState();
    const [packageId, setPackageId] = useState('');
    const { data: supplierlist } = useGetAllSupplier();
    const { data: productlist } = useGetAllProduct();
    const { data: packagelist } =  useGetAllPackageByProduct(productId);



   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await addSupply (data)
          console.log(response.data)
            toast.success('Terminé!', {
                id:toastId
           });
         router.push('/supplies/');
        }
        catch(exception){
            toast.error('Echec', {
                id:toastId
            });
            console.log(exception)
        }
    } 
    
    function handleSelectedProduct(e){
        setProductId(e.target.value);
       // setPackageId('');
    }

    function handleSelectedPackage(e){
        setPackageId(e.target.value);
    }
    
    return (
        <DashboardLayout>

        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer un approvisionnement</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("supplyDate")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="date" placeholder="Date de l'approvisionnement" aria-label="date" />
                </div>
                <div>
                <select {...register("supplier_id")} name="supplier_id" id="supplier_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un fournisseur</option>
                    { supplierlist !== undefined && supplierlist.data.data.map( supplier => <option key={supplier.id}  value={supplier.id}>{supplier.name}</option>) }
                </select>   
                </div>
            <div className="grid border border-color:black">
                <div>
                <select onProductChange={handleSelectedProduct} value={productId} {...register("product_id")} name="product_id" id="product_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un produit</option>
                    { productlist !== undefined && productlist.data.data.map( product => <option key={product.id}  value={product.id}>{product.name}</option>) }
                </select>
                <select onPackageChange={handleSelectedPackage} disabled={!productId} {...register("package_id")} name="package_id" id="package_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un produit</option>
                    { packagelist !== undefined && packagelist.data.data.map( package => <option key={package.id}  value={package.id}>{package.package}</option>) }
                </select>   
                </div> 
                {/*<div className="w-full mt-4">
                    <input {...register(`conditions.${index}.package`) } className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Conditionnement" aria-label="package" />
                </div>*/}
                <div className="w-full mt-4">
                    <input {...register(`supply_qte`) } className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Quanité d'approvisionnement" aria-label="qte" />
                </div>
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



