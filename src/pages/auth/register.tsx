import { createAccount } from "@/features/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router';

export default function RegisterPage() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

   async function onSubmit(data:any){
       const toastId = toast.loading('Patientez...');
        try{
          const response =  await createAccount(data)
          console.log(response.data)
          toast.success('Créé avec succès!', {
            id: toastId
          });
          router.push('/auth/login')
        }
        catch(exception){
            toast.error('Echec de création!', {
                id: toastId
            });
            console.log(exception)
        }
    }

    return (
        <main className="w-full h-screen flex items-center justify-center">

        <section className=" w-full  max-w-lg ">
    <h2 className="text-lg font-semibold text-center text-gray-700 capitalize dark:text-white">Inscription</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Nom</label>
                <input {...register("name")} id="name" type="text" className="input input-bordered w-full max-w-xl" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email </label>
                <input {...register("email")} id="email" type="email" className="input input-bordered w-full max-w-xl" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Mot de passe</label>
                <input {...register("password")} id="password" type="password" className="input input-bordered w-full max-w-xl" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password_confirmation">Confirmer mot de passe</label>
                <input {...register("password_confirmation")} id="password_confirmation" type="password" className="input input-bordered w-full max-w-xl" />
            </div>
        </div>

        <div className="flex justify-between mt-6">
            <div className="block ">
                <span className="text-sm text-gray-600 dark:text-gray-200">Avez vous déja un compte? </span>
        
                <a href="/auth/login" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Se connecter</a>
            </div>

            <button className="btn btn-primary">S'incrire</button>
        </div>

    </form>
</section>
</main>

    )
}
