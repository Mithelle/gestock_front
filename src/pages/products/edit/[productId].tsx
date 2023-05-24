import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetOneProduct, useUpdateProduct } from "@/features/Product/product.service";
import { useGetAllProductFamily } from "@/features/productFamily/productFamily.service";

export default function ProductPage() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState:{ errors } } = useForm();

    const { data: oneProduct } = useGetOneProduct(router.query.productId);
    const updateProduct = useUpdateProduct();
    const allProductFamily = useGetAllProductFamily();
    
    console.log(allProductFamily);


    useEffect(() => {
        if(oneProduct != undefined) {
            reset({
                ref: oneProduct?.data?.product?.ref,
                name: oneProduct?.data?.product?.name,
                description: oneProduct?.data?.product?.description,
            })
        }
    }, [oneProduct])

   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        updateProduct.mutate({ ...data, id: router.query.productFamilyId})

        toast.success('Produit modifié avec succès!', {
            id:toastId
        })
        toast.error('Echec!', {
            id:toastId
    })

    }

    if(updateProduct.isSuccess) {
        router.push('/products')
    }
    
    if(updateProduct.isError) {

    }
    
    
    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400"> Modifier </p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mt-4">
                    <input {...register("ref")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Référence" aria-label="ref" required/>
                </div>
            <div className="w-full mt-4">
                    <input {...register("name")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Nom du produit" aria-label="name" required />
                </div>
                <div className="w-full mt-4">
                    <input {...register("description")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Description" aria-label="description" />
                </div>
                <div>
                <select {...register("productFamily_id")} name="productFamily_id" id="productFamily_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un site</option>
                    { productFamilylist !== undefined && productFamilylist.data.data.map( productFamily => <option key={productFamily.id}  value={productFamily.id}>{productFamily.name}</option>) }
                    </select>            
               </div>
               <div>
                <select {...register("measurement_id")} name="measurement_id" id="measurement_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez une unité de mesure</option>
                    { measurementlist !== undefined && measurementlist.data.data.map( measurement => <option key={measurement.id}  value={measurement.id}>{measurement.name}</option>) }
                    </select>            
               </div>
               <div className="w-full mt-1">
                    <label htmlFor="seuil" className="text-gray-700 dark:text-gray-200">Seuil d'info:</label>
                    <input type="number" name="info" id="info" className="px-4 py-1 mt-2 ml-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"/>
                </div>
                <div className="w-full mt-1">
                    <label htmlFor="seuil" className="text-gray-700 dark:text-gray-200">Seuil d'alerte:</label>
                    <input type="number" name="alerte" id="alerte" className="px-4 py-1 mt-2 ml-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <div className="w-full mt-1">
                    <label htmlFor="seuil" className="text-gray-700 dark:text-gray-200">Seuil critique:</label>
                    <input type="number" name="critique" id="critique" className="px-4 py-1 mt-2 ml-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"/>
                </div>
                
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Activer les seuils</span>
            </label>

                <div className="block items-center justify-between mt-6">
                <button className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    )
}



