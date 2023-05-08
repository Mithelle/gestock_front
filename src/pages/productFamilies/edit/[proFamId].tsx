import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetOneProductFamily, useUpdateProductFamily } from "@/features/productFamily/productFamily.service";

export default function ProductFamilyPage() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState:{ errors } } = useForm();

    const { data: oneProductFamily } = useGetOneProductFamily(router.query.ProductFamilyId)
    const updateProductFamily = useUpdateProductFamily()

    useEffect(() => {
        if(oneProductFamily != undefined) {
            reset({
                name: oneProductFamily?.data?.productFamily?.name,
                ref: oneProductFamily?.data?.productFamily?.ref,
                description:oneProductFamily?.data.productFamily?.description
            })
        }
    }, [oneProductFamily])

   async function onSubmit(data:any){
    const toastId = toast.loading('En cours...');
        useUpdateProductFamily.mutate({ ...data, id: router.query.proFamId})

        toast.success('Famille de produit modifiée avec succès!', {
            id:toastId
        })
        toast.error('Echec!', {
            id:toastId
    })

    }

    if(updateProductFamily.isSuccess) {
        router.push('/productFamilies')
    }
    
    if(updateProductFamily.isError) {

    }
    
    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400"> Modifier </p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("name")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Nom de l'annexe" aria-label="name" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("ref")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Référence" aria-label="ref" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("description")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Description" aria-label="description" />
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



