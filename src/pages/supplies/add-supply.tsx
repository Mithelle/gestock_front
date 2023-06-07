import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { addSupply } from "@/features/supply/supply.service";
import { useGetAllSupplier } from "@/features/supplier/supplier.service";
import { useGetAllProduct } from "@/features/product/product.service";
import { useEffect, useState } from "react";
import { useGetAllPackageByProduct, useGetMultiplePackageByProduct } from "@/features/package/packaging.service";
import Link from "next/link";

export default function AddSupplyPage() {
    const router = useRouter();
    const { register, handleSubmit, control, watch, formState:{ errors } } = useForm();

    const [packageId, setPackageId] = useState('');
    const [productId, setProductId] = useState();
    const [openModal, setOpenModal] = useState(false);
    const { data: supplierlist } = useGetAllSupplier();
    const { data: productlist } = useGetAllProduct();
    const packagelist =  useGetAllPackageByProduct(productId);

    const [index, setIndex] = useState('');
    const [conditions, setConditions] = useState<Record<string,any>[]>([]);
    const watchProduct = watch(`supply.${index}.product_id`)

    function remapProductIds(arr: any[]){
       return arr.map((_,index)=>{
            const productId = watch(`supply.${index}.product_id`)
            return productId
        })
    }
       // console.log(multiplePackage);
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
    
    function onOpen(){
        setOpenModal(true);
    }
    
    function append(payload: Record<string, any>){
        setConditions((prev) => [...prev, payload]);
    }

    function remove(index: number){
        setConditions((prev) => prev.filter((_,idx) => index !== idx))
    }

    function handleProductChange(e){
        setProductId(e.target.value);
        setPackageId('');
    }
    
    function handlePackageChange(e){
        setPackageId(e.target.value);
    }
    console.log(packagelist);

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
            <div className="flex mt-2">
                <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                      <Link href="/suppliers/add-supplier">Ajouter un fournisseur</Link>
                </button>
                </div>
            </div>

            <div className="block items-center justify-between mt-6">
            <button type="button" onClick={onOpen} className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Ajouter un produit
                </button>
            </div>

{ openModal && <div className="fixed w-full h-screen bg-gray-900/25 flex items-center justify-center z-50 inset-0">
            <div className="grid grid-cols-1 gap-2 mt-4 border border-color:black  bg-white p-8 rounded-md">

                <div>
                <select onChange={handleProductChange} name="product_id" id="product_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un produit</option>
                    { productlist !== undefined && productlist.data.data.map( product => <option key={product.id} value={product.id}>{product.name}</option>) }
                </select>
                <select onChange={handlePackageChange} name="package_id" id="package_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez le conditionnement</option>
                    { packagelist !== undefined && packagelist.data.data.map( packages => <option key={packages.id}  value={packages.id}>{packages.package}</option>) }
                </select>   
                </div> 
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Quanité d'approvisionnement" aria-label="qte" />
                </div>
                <div className="flex gap-x-3 justify-end mt-4">
                    <button className="block px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Annuler
                    </button>
                    <button className="block px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Créer
                    </button>
                </div>
            </div>
</div>}
            
           <table className="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Produit
                </th>
                <th scope="col" className="px-6 py-3">
                   Conditionnement
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantité
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        azer
                    </td>
                    <td className="px-6 py-4">
                          azerty
                    </td>
                    <td className="px-6 py-4">
                        123
                    </td>
                </tr>
           </tbody> 
    </table>

    </form>
    </div>
    </div>
    </DashboardLayout>
    );
}


