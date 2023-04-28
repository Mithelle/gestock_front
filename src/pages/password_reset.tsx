import { resetUserpwd } from "@/features/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


export default function ResetPassword() {
    const router = useRouter ();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();

    async function onSubmit(data: any){
        try{
            const response =  await resetUserpwd ({...data, email: router.query.email})
            // console.log(response)
            router.push('/login');
        }
        catch(exception){
            // console.log(exception);
            console.error(exception.response.data.message);
            toast.error(exception.response.data.message);
        }

    }

        return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
            </div>
    
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Changez votre mot de passe</h3>    
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4">
                    <input {...register("password")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder=" Nouveau mot de passe" aria-label="password" />
                </div>
                <div className="w-full mt-4">
                    <input {...register("password_confirmation")} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Confimer mot de passe" aria-label="password" />
                </div>
                
    
                    <button className="mt-1 px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                       Enregistrer
                    </button>
            </form>
        </div>
    
    </div>
    );

}
