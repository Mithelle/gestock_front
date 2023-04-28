import { pwdUser } from "@/features/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


export default function ResetPage() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState:{ errors } } = useForm();

    async function onSubmit(data:any){
            const toastId = toast.loading('Patientez...');
        try{
        const response =  await pwdUser (data)
        toast.success('Un mail vient d\'être envoyé à votre adresse', {
            id:toastId
        })
        reset()
        console.log(response)
        }
        catch(exception){
            toast.error('echec!', {
                id:toastId
            });

            console.log(exception);
        }

    }

        return ( 
            
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <p className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Mot de passe oublié?</p>
    
        <div className=" block px-6 py-4">   
        <form onSubmit={handleSubmit(onSubmit)}> 
            <fieldset >
                <legend className="mt-1 text-center text-gray-500 dark:text-gray-400">Veuillez entrer votre adresse mail</legend>
                <div className="w-full mt-4">
                    <input {...register("email")} className=" w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-300 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="email" aria-label="Email Address" />
                </div>
                        
                    <button className=" mt-1 mr-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                       Envoyer
                    </button>
            </fieldset>
            </form>
        </div>
    
    </div>
    );

}
