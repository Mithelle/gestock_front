import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { CompanyCreate } from "@/features/company/company.service";

export default function CreateCompany() {
   const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();

   async function onSubmit(data:any){
    const toastId = toast.loading('Création...');
        try{
         const response =  await CompanyCreate(data)
          console.log(response.data)

            toast.success('Terminé!', {
                id:toastId
           });
         router.push('/admin/');
        }
        catch(exception){
            toast.error('Echec', {
                id:toastId
            });
            console.log(exception)
        }
    }

    
    return (
        <DashboardLayout>
            
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Créer une entreprise</p>
    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
            <label className=" text-gray-500"> Nom </label>
                    <input {...register("name")} className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text"  aria-label="name" required name="name"/>
                </div>
                <div className="w-full mt-4">
                <label className=" text-gray-500"> Email </label>
                    <input {...register("email")} className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email"  aria-label="Email Address" required />
                </div>
                <div className="w-full mt-4">
                <label className=" text-gray-500"> Téléphone </label>
                    <input {...register("tel")} className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="tel" name="tel" placeholder="+000 000 000 00" />
                </div>
                <div className="w-full mt-4">
                <label className=" text-gray-500"> Adresse</label>
                    <input {...register("adresse")} className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" aria-label="Address"  />
                </div>
                <div className="w-full mt-4">
                    <label className=" text-gray-500"> Logo(facultatif) </label>
                    <input {...register("logo")} className="block w-full px-6 py-4 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="file" name="logo" accept="image/png, image/jpg" />
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



