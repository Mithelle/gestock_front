import DashboardLayout from "@/component/Layout";
import { useGetAllProduct } from "@/features/product/product.service";
import { useDeletePackage, useGetAllPackageByProduct } from "@/features/package/packaging.service";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PackagelistPage(){
    const [productId, setProductId] = useState('');
        const router = useRouter();
        const { data: packagelist } = useGetAllPackageByProduct(productId);
        const {data: allProduct } = useGetAllProduct();

        const deletePackage = useDeletePackage();
        function onDelete(id: string){
            deletePackage.mutate(id)
            router.reload();
        }
        function onSelectProduct(value: string){
            setProductId(value)
         }
return(
    <DashboardLayout>

<section >
 <div className="max-w-5xl mx-auto py-16 bg-white">
  <article className="overflow-hidden">
   <div className="bg-[white] rounded-b-md">
    <div className="p-9">
     <div className="space-y-6 text-slate-700">
      <img className="object-cover h-12" src="" alt="Logo de l'entreprise"/>

      <p className="text-xl font-extrabold tracking-tight uppercase font-body">
       Nom de L'entreprise
      </p>
     </div>
    </div>
    <div className="p-9">
     <div className="flex w-full">
      <div className="grid grid-cols-4 gap-12">
       <div className="text-sm font-light text-slate-500">
        <p className="text-sm font-normal text-slate-700">Bon de commande n:</p>
        <p>BC2023000012</p>

        <p className="mt-2 text-sm font-normal text-slate-700">
         Date de delivrance: 
        </p>
        <p>00/00/00</p>
       </div>
       <div className="text-sm font-light text-slate-500">
        <p className="text-sm font-normal text-slate-700">Client: </p>
        <p>ALI jean</p>
        <p>adresse</p>
        <p>telephone</p>
       </div>
       <div className="text-sm font-light text-slate-500">
       <div className="text-sm font-light text-slate-500">
        <p className="text-sm font-normal text-slate-700">Modalite: </p>
        <p>0 Days</p>

        <p className="mt-2 text-sm font-normal text-slate-700">Du: </p>
        <p>00/00/00</p>
       </div>
       </div>
       <div>
        <p className="text-sm font-normal text-slate-700">
         Bon de commande n:
        </p>
        <p>BC2023000012</p>
        </div>
      </div>
     </div>
    </div>

    <div className="p-9">
     <div className="flex flex-col mx-0 mt-8">
      <table className="min-w-full divide-y divide-slate-500">
       <thead>
        <tr>
         <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
          Produit
         </th>
         <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
          Quantity
         </th>
         <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
          Taux TVA
         </th>
         <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
          total TVA
         </th>
         <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
          Total TTC
         </th>
        </tr>
       </thead>
       <tbody>
        <tr className="border-b border-slate-200">
         <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
          <div className="font-medium text-slate-700">Iphone</div>
          <div className="mt-0.5 text-slate-500 ">
           0000f
          </div>
         </td>
         <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          48
         </td>
         <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          0f
         </td>
         <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          0f
         </td>
         <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          0f
         </td>
        </tr>
        <tr className="border-b border-slate-200">
         <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
          <div className="font-medium text-slate-700">
           Pc HP
          </div>
          <div className="mt-0.5 text-slate-500">
           750000f
          </div>
         </td>
         <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
           4
         </td>
         <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          00f
         </td>
         <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          00f
         </td>
         <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          00f
         </td>
        </tr>
       </tbody>
       <tfoot>
        <tr>
         <th scope="row" col-span="3" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Sous-total
         </th>
         <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Subtotal
         </th>
         <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          00f
         </td>
        </tr>
        <tr>
         <th scope="row" col-span="3" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Reduction
         </th>
         <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Discount
         </th>
         <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          00f
         </td>
        </tr>
        <tr>
         <th scope="row" col-span="3" className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Taxe
         </th>
         <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Tax
         </th>
         <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          00f
         </td>
        </tr>
        <tr>
         <th scope="row" col-span="3" className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
          Total
         </th>
         <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
          Total
         </th>
         <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
          00f
         </td>
        </tr>
       </tfoot>
      </table>
     </div>
    </div>

    <div className="mt-48 p-9">
     <div className="border-t pt-9 border-slate-200">
      <div className="text-sm font-light text-slate-700">
       <p>
        Merci de faire affaire avec nous     
       </p>
      </div>
     </div>
    </div>
   </div>
  </article>
 </div>
<div className="flex items-top justify-center bg-gray-100">
            <div className="w-7/12 mt-4 text-left bg-white shadow-lg">
                <div className="flex justify-between px-8 py-6">
                    <div className="flex items-center">
                        sale invoice
                    </div>
                    <div className="flex items-end justify-end space-x-3">
                        <button className="px-4 py-2 text-sm text-green-600 bg-green-100">Imprimer</button>
                        <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">Enregistrer</button>
                        <button className="px-4 py-2 text-sm text-red-600 bg-red-100">Annuler</button>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-gray-800"></div>

            </div>
        </div>

</section>



</DashboardLayout>
);
}