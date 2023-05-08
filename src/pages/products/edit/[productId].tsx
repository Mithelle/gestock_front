import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetOneStore, useUpdateStore } from "@/features/store/store.service";
import { useGetAllShop, useGetOneShop, useUpdateShop } from "@/features/shop/shop.service";
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
                name: oneProduct?.data?.product?.name,
                ref: oneProduct?.data?.product?.ref,
                dateP: oneProduct?.data?.product?.dateP,
                Pu: oneProduct?.data?.product?.Pu,
                qte: oneProduct?.data?.product?.qte,
                fournisseur: oneProduct?.data?.product?.fournisseur,
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



