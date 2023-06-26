 import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/Layout";
import { CompanyCreate } from "@/features/company/company.service";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from "react";
import { useGetAllCountry } from "@/features/country/country.service";

export default function CreateCompany() {
   const router = useRouter();
    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const [phone,setPhone] = useState();
    const { data: countrylist } = useGetAllCountry();
    const [logo, setLogo] = useState();

    console.log({ countrylist });

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

    function onFileUpload(e){
        setLogo(e.target.value);
    }

    
    return (
        // <DashboardLayout>
            
        <div className="w-full h-screen flex items-center max-w-2xl mx-auto">
        <div className="px-6 py-4 w-full">
        
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Veuillez créer une entreprise</p>
    
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 grid grid-cols-2 gap-x-4">
                <div className="w-full mt-4">
                    <label className=" text-gray-500"> Nom </label>
                    <input {...register("name")} className="input input-bordered w-full" type="text"  aria-label="name" required name="name"/>
                </div>
                <div className="w-full mt-4">
                    <label className=" text-gray-500"> Email </label>
                    <input {...register("email")} className="input input-bordered w-full" type="email"  aria-label="Email Address" required />
                </div>
                <div className="w-full mt-4">
                    <label className=" text-gray-500"> IFU </label>
                    <input {...register("fiscalId")} className="input input-bordered w-full" type="text"  aria-label="fiscalId" required name="fiscalId"/>
                </div>
                <div className="w-full mt-4">
                    <label className=" text-gray-500"> RCCM </label>
                    <input {...register("registerNum")} className="input input-bordered w-full" type="registerNum"  aria-label="registerNum" required />
                </div>
                <div>
                    <div>
                        <label className="text-gray-500">Pays</label>
                        <select {...register("country")} id="country" className="input input-bordered w-full">
                            <option value="">Veuillez entrer votre pays</option>
                            { countrylist !== undefined && countrylist.data.map( country => <option key={country.name}  value={country.name}>{country.name}</option>) }
                        </select>            
                    </div>
                </div>
                <div className="w-full mt-4">
                <label className=" text-gray-500"> Téléphone </label>
                <PhoneInput {...register("tel")}   value={phone} onChange={setPhone} className="input input-bordered w-full" type="tel" aria-label="phone" />
                </div>
                {/* <div className="w-full mt-4">
                <label className=" text-gray-500"> Pays</label>
                    <input {...register("countries")} className="input input-bordered w-full" type="text" aria-label="pays"  />
               </div> */}
                <div className="w-full mt-4">
                <label className=" text-gray-500"> Adresse</label>
                    <input {...register("adresse")} className="input input-bordered w-full" type="text" aria-label="Address"  />
                </div>
                <div className="w-full mt-4">
                    <label className=" text-gray-500"> Logo(facultatif) </label>
                    <input onChange={onFileUpload} className="file-input w-full" type="file" accept="image/png, image/jpg" />
                </div>
    
                <div className="w-full col-span-2   ">
                <button className="btn btn-primary w-full mt-6">
                        Créer
                    </button>
                </div>
            </form>
        </div>
    
    </div>
            //   </DashboardLayout>
    )
}



