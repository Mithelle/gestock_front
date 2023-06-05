import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { useGetAllSupplier } from "@/features/supplier/supplier.service";
import { useGetAllProduct } from "@/features/product/product.service";
import { useState } from "react";
import { useGetAllPackageByProduct } from "@/features/package/packaging.service";
import Link from "next/link";
import { addInvoice } from "@/features/invoice/invoice.service";
import { useGetAllCustomer } from "@/features/customer/customer.service";
import { useGetAllShop } from "@/features/shop/shop.service";
import { useGetAllStore } from "@/features/store/store.service";
import { useGetAllUser } from "@/features/user/user.sevice";

export default function AddInvoicePage() {
    const router = useRouter();
    const { register, handleSubmit, control, watch, formState:{ errors } } = useForm();
    const { fields, prepend, remove } = useFieldArray({
        control,
        name:"supply",
    });
    const [productId, setProductId] = useState();
    const [packageId, setPackageId] = useState('');
    const [product_item, setProduct_item] = useState([]);
    const { data: supplierlist } = useGetAllSupplier();
    const { data: productlist } = useGetAllProduct();
    const { data: packagelist } =  useGetAllPackageByProduct(productId);
    const { data: customerlist } =  useGetAllCustomer();
    const { data: shoplist } =  useGetAllShop();
    const { data: storelist } =  useGetAllStore();
    const { data: userlist } =  useGetAllUser();


   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        try{
         const response =  await addInvoice(data)
          console.log(response.data)
            toast.success('Terminé!', {
                id:toastId
           });
         router.push('/invoices/');
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
        setPackageId('');
    }

    function handleSelectedPackage(e){
        setPackageId(e.target.value);
    }
    //console.log(packagelist);

    return (

        <DashboardLayout>

        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer un approvisionnement</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("invoiceDate")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="date" placeholder="Date de la facture" aria-label="date" />
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
                <div>
                <select {...register("customer_id")} name="customer_id" id="customer_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un client</option>
                    { customerlist !== undefined && customerlist.data.data.map( customer => <option key={customer.id}  value={customer.id}>{customer.name}</option>) }
                </select> 
                <div className="flex mt-2">
                    <button className="ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                          <Link href="/customers/add-customer">Ajouter un client</Link>
                    </button>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <input {...register("term")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Mode de paiement" aria-label="term" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("invoiceNum")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Numero de la facture" aria-label="date" />
                </div>
                <div>
                <select {...register("shop_id")} name="shop_id" id="shop_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un point de vente</option>
                    { shoplist !== undefined && shoplist.data.data.map( shop => <option key={shop.id}  value={shop.id}>{shop.name}</option>) }
                </select> 
                </div>
                <div>
                <select {...register("depot_id")} name="depot_id" id="depot_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un depot</option>
                    { storelist !== undefined && storelist.data.data.map( store => <option key={store.id}  value={store.id}>{store.name}</option>) }
                </select> 
                </div>
                <div>
                <select {...register("user_id")} name="user_id" id="user_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un vendeur</option>
                    { userlist !== undefined && userlist.data.data.map( user => <option key={user.id}  value={user.id}>{user.name}</option>) }
                </select> 
                </div>

                <div className="block items-center justify-between mt-6">
                <button type="button" onClick={()=> prepend({ quantity:"" })} className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Ajouter un produit
                    </button>
                </div>
            {fields.map((value, index) =>
            <div className="grid grid-cols-1 gap-2 mt-4 border border-color:black">
                <svg onClick={() => remove(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

                <div>
                <select {...register(`supply.${index}.product_id`)}  value={productId}  name="product_id" id="product_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un produit</option>
                    { productlist !== undefined && productlist.data.data.map( product => <option key={product.id} value={product.id}>{product.name}</option>) }
                </select>
                <select {...register(`supply.${index}.package_id`)} disabled={!productId}  value={packageId} name="package_id" id="package_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez le conditionnement</option>
                    { packagelist !== undefined && packagelist.data.data.map( packages => <option key={packages.id}  value={packages.id}>{packages.package}</option>) }
                </select>   
                </div> 
                {/*<div className="w-full mt-4">
                    <input {...register(`conditions.${index}.package`) } className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Conditionnement" aria-label="package" />
                </div>*/}
                <div className="w-full mt-4">
                    <input {...register(`invoice.${index}.quantity`) } className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Quanité vendu" aria-label="qte" />
                </div>
                <div className="w-full mt-4">
                    <input {...register(`invoice.${index}.pu_ht`) } className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Prix HT" aria-label="qte" />
                </div>
                <div className="w-full mt-4">
                    <input {...register(`invoice.${index}.pu_ttc`) } className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Prix TTC" aria-label="qte" />
                </div>
                <div className="w-full mt-4">
                    <input {...register(`invoice.${index}.amount_ht`) } className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" placeholder="Montant HT" aria-label="qte" />
                </div>
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


