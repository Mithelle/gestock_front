import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { addSupply } from "@/features/supply/supply.service";
import { useGetAllSupplier } from "@/features/supplier/supplier.service";
import { useGetAllProduct } from "@/features/product/product.service";
import { useState} from "react";
import { useGetAllPackageByProduct } from "@/features/package/packaging.service";
import Link from "next/link";
import {TrashIcon} from "@heroicons/react/24/outline";
import { useGetAllStore } from "@/features/store/store.service";

export default function AddSupplyPage() {
    const router = useRouter();
    const { register, handleSubmit, control, getValues, watch, formState:{ errors } } = useForm();

    const [packageId, setPackageId] = useState('');
    const [productId, setProductId] = useState();
    const [openModal, setOpenModal] = useState(false);
    const { data: supplierlist } = useGetAllSupplier();
    const { data: storelist } = useGetAllStore();
    const { data: productlist } = useGetAllProduct();
    const { data: packagelist} =  useGetAllPackageByProduct(productId);

    //const [index, setIndex] = useState('');
    const [conditions, setConditions] = useState<Record<string,any>[]>([]);

    /*function remapProductIds(arr: any[]){
       return arr.map((_,index)=>{
            const productId = watch(`supply.${index}.product_id`)
            return productId;
        })
    }*/
   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await addSupply ({...data, packages: conditions, product: conditions})
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

    function onClose(e){
        e.preventDefault();
        window.my_modal_1.close()
        //setProductId('');
    }

    function append(){
        const product = productlist?.data.data.filter(p => p.id ==productId)
        const packages = packagelist?.data.data.filter(p => p.id ==packageId)

        const payload = {
          product_id: productId,
          product: product[0],
          package_id: packageId,
          packages: packages[0],
          quantity: getValues('quantity')
        };
        setConditions((prev) => [...prev, payload]);
        window.my_modal_1.close()
         
    }

    function remove(index: number){
        setConditions((prev) => prev.filter((_,idx) => index !== idx))
    }

    function handleProductChange(e: any){
        setProductId(e.target.value);
        setPackageId('');
    }

    function handlePackageChange(e: any){
        setPackageId(e.target.value);
    }


    return (

        <DashboardLayout title="">
            <div className="w-full  mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="px-6 py-4">

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer un approvisionnement</p>

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-4">
                <input {...register("date")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="date" placeholder="Date de l'approvisionnement" aria-label="date" />
            </div>
            <div>
            <select {...register("supplier_id")} name="supplier_id" id="supplier_id" className="block px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                <option value="">Choisissez un fournisseur</option>
                { supplierlist !== undefined && supplierlist.data.data.map( supplier => <option key={supplier.id}  value={supplier.id}>{supplier.name}</option>) } 
            </select>
                <Link href="/suppliers/add-supplier">Nouveau fournisseur ?</Link>
            </div>
            <div>
            <select {...register("depot_id")} name="depot_id" id="depot_id" className="block px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                <option value="">Choisissez un depot</option>
                { storelist !== undefined && storelist.data.data.map( store => <option key={store.id}  value={store.id}>{store.name}</option>) } 
            </select>
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
                <input {...register('quantity')} type="number" min={0} placeholder="Quanité d'approvisionnement" aria-label="qte" className="w-full max-w-md input input-bordered" />
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
                        <th>Quantité</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>{index +1}</th>
                        <td>{condition.product.name}</td>
                        <td>{condition.packages.package}</td>
                        <td>{condition.quantity}</td>
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
    );
}


