import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router';
import DashboardLayout from "@/component/Layout";
import { useGetAllShop } from "@/features/shop/shop.service";
import { CreateUser } from "@/features/user/user.sevice";

export default function UserCreatingPage() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { data: shoplist, isLoading  } = useGetAllShop();
    //const [shopList,setShopList] = useState();
    
    
   async function onSubmit(data:any){
       const toastId = toast.loading('En cours...');
        try{
          const response =  await CreateUser(data)  
          console.log(response.data)
          toast.success('Terminé!', {
            id: toastId  
          });  
          router.push('/users/')
        }  
        catch(exception){
            toast.error('Echec!', {
                id: toastId
            });    
            console.log(exception)
        }    
    }    

    return (
        <DashboardLayout title="Employés / Créer">
        <section className="  max-w-xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">

    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-4">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Nom</label>
                <input {...register("name")} id="name" type="text" className="block  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email </label>
                <input {...register("email")} id="email" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Mot de passe</label>
                <input {...register("password")} id="password" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password_confirmation">Confirmer mot de passe</label>
                <input {...register("password_confirmation")} id="password_confirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
        </div>

        <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="annexe">Annexes</label>
                <select {...register("shop_id")} name="shop_id" id="shop_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Choisissez un site</option>
                    {shoplist !== undefined && shoplist.data.data.map( shop => <option key={shop.id}  value={shop.id}>{shop.name}</option>)}
                    </select>            
        </div>
        
        {/*<div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="roles">Roles</label>
                <select {...register("role_id")} name="role_id" id="role_id" className="block  px-4 py-2 mt-2 text-gray-500 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Definissez le role de l'utilisateur</option>
                    <option value="">Magasinier(ère)</option>
                    <option value="">Vendeur(se)</option>
                    <option value="">Caissier(ère)</option>
                    <option value="">Inventorist(e)</option>
                    </select>            
        </div>*/}
                <div className="mt-4">
                <p>Rôles</p>
                <div className="ml-2 text-sm mt-2 font-medium text-gray-700 dark:text-gray-300">
                    <label className="ml-2" htmlFor="role">Assitant Administrateur</label>
                    <input {...register("statut")}
                        className="relative float-left w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="checkbox"
                        id="admin"
                        value="admin"
                        />
                </div>
                <div className="ml-2 text-sm mt-2 font-medium text-gray-700 dark:text-gray-300">
                    <label className="ml-2" htmlFor="role">Magasinier(ère)</label>
                    <input {...register("statut")}
                        className="relative float-left w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="checkbox"
                        id="magasinier"
                        value="magasinier"
                        />
                </div>
                <div className="ml-2 text-sm mt-2 font-medium text-gray-700 dark:text-gray-300">
                <label className="ml-2" htmlFor="role">Vendeur(se)</label>
                <input {...register("statut")}
                    className="relative float-left w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    id="vendeur"
                    value="vendeur"/>
                </div>
                <div className="ml-2 text-sm mt-2 font-medium text-gray-700 dark:text-gray-300">
                <label className="ml-2" htmlFor="role">Caissier(ère)</label>
                <input {...register("statut")}
                    className="relative float-left w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    id="caissier"
                    value="caissier"/>
                </div>
                <div className="ml-2 text-sm mt-2 font-medium text-gray-700 dark:text-gray-300">
                <label className="ml-2" htmlFor="role">Inventoriste</label>
                <input {...register("statut")}
                    className="relative float-left w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    id="inventoriste"
                    value="inventoriste"/>
                </div>
                </div>

        <div className="block items-center justify-between mt-6">
                <button className="block ml-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Créer
                    </button>
                </div>


    </form>
</section>
</DashboardLayout>
    );
}
