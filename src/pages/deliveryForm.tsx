import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { CompShop } from "@/features/shop/shop.service";
import { useState } from "react";
import { useGetAllSupplier } from "@/features/supplier/supplier.service";
import { useGetAllProduct } from "@/features/product/product.service";
import { useGetAllPackageByProduct } from "@/features/package/packaging.service";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function deliveryFormPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, getValues, formState:{ errors } } = useForm();

    const [packageId, setPackageId] = useState('');
    const [productId, setProductId] = useState();
    const { data: supplierlist } = useGetAllSupplier();
    const { data: productlist } = useGetAllProduct();
    const { data: packagelist} =  useGetAllPackageByProduct(productId);

    const [conditions, setConditions] = useState<Record<string,any>[]>([]);



   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await CompShop (data)
          console.log(response.data)
            toast.success('Terminé!', {
                id:toastId
           });
         router.push('/shops/');
        }
        catch(exception){
            toast.error('Echec', {
                id:toastId
            });
            console.log(exception)
        }
    } 
    
    function onClose(e){
        e.preventDefault();
        window.my_modal_1.close()
        //setProductId('');
    }

    function append(){
        const payload = {
          product_id: productId,
          package_id: packageId,
          quantity: getValues('quantity')
        };
        setConditions((prev) => [...prev, payload]);
        window.my_modal_1.close()
        
    }

    function handleProductChange(e: any){
        setProductId(e.target.value);
        setPackageId('');
    }

    function handlePackageChange(e: any){
        setPackageId(e.target.value);
    }


    return (
        <DashboardLayout>

        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer un bon de commande</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("delivNum")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Numéro de la livraison" aria-label="delivNum" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("deliveryDate")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="date" placeholder="Date de livraison" aria-label="date" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("delivAdresse")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Adresse de la livraison" aria-label="Address" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("receiver")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Receveur" aria-label="receiver" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("status")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Statut de la livraison" aria-label="receiver" />
                </div>

                <div className="items-center justify-between block mt-6">
            <button type='button' className="btn" onClick={()=>window.my_modal_1.showModal()}>Ajouter</button>
            </div>

            <dialog id="my_modal_1" className="modal">
            <div className="modal-box space-y-4">
                <h3 className="text-lg font-bold">Ajouter un produit</h3>
                <select onChange={handleProductChange} className="w-full max-w-md select select-bordered">
                      <option disabled selected>Sélectionnez un produit</option>
                         { productlist !== undefined && productlist.data.data.map( product => <option key={product.id} value={product.id}>{product.name}</option>) } 
                </select>
                <select onChange={handlePackageChange} className="w-full max-w-md select select-bordered">
                      <option disabled selected>Sélectionnez un conditionnement</option>
                         { packagelist !== undefined && packagelist.data.data.map( packages => <option key={packages.id} value={packages.id}>{packages.package}</option>) } 
                </select>
                <input {...register('quantity')} type="number" min={0} placeholder="Quanité Livrée" aria-label="qteL" className="w-full max-w-md input input-bordered" />
                <div className="w-full mt-4">
                    <input {...register('quantityV') } className="w-full max-w-md input input-bordered" type="number" min={0} placeholder="Quantité vendue" aria-label="qteV" />
                </div>
                <div className="w-full mt-4">
                    <input {...register('quantityL') } className="w-full max-w-md input input-bordered" type="number" min={0} placeholder="Quantité livrée" aria-label="qteL" />
                </div>
                <div className="w-full mt-4">
                    <input {...register('quantityR') } className="w-full max-w-md input input-bordered" type="number" min={0} placeholder="Quantité restante" aria-label="qteR" />
                </div>
                <div className="modal-action">
                    <button onClick={onClose} className="btn">Fermer</button>
                    <button onClick={append} type="button" className="btn btn-info">Ajouter</button>
                </div>
            </div>
            </dialog>
                { conditions.map((condition,index) =>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Produit</th>
                        <th>Conditionnement</th>
                        <th>Quantité vendue</th>
                        <th>Quantité livrée</th>
                        <th>Quantité restante</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>{index +1}</th>
                        <td>{condition.product_id}</td>
                        <td>{condition.package_id}</td>
                        <td>{condition.quantityV}</td>
                        <td>{condition.quantityL}</td>
                        <td>{condition.quantityR}</td>
                        <td>
                            <button className="btn btn-outline btn-error btn-sm"> <TrashIcon className="w-4 h-4  text-red-700" /> </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            )}
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



