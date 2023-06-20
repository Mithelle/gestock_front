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
        //const { data: measurelist } = useGetAllMeasureByProduct(productId);

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
<div>
<div className="flex items-top justify-center bg-gray-100">
            <div className="w-7/12 mt-4 my-6 text-left bg-white shadow-lg">
                <div className="flex justify-between px-8 py-6">
                    <div className="flex items-center">
                        Facture de vente
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


<div className="flex items-center justify-center min-h-screen text-black bg-gray-100 ">
            <div className="w-4/5 bg-white shadow-lg">
                <div className="flex justify-between p-4">
                    <div>
                    <img className="object-cover h-12" src="" alt="Logo de l'entreprise"/>
                        <h1 className="text-3xl italic font-extrabold tracking-widest text-orange-500">Nom de l'entreprise</h1>
                        <p className="text-base">Description de l'entreprise</p>
                    </div>
                    {/*informations*/}
                    <div className="p-2">
                        <ul className="flex">
                            <li className="flex flex-col items-center p-2 border-l-2 border-orange-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="text-sm">
                                    www.email.com 
                                </span>
                                <span className="text-sm">
                                    www.resauxsociaux.com
                                </span>
                            </li>
                            {/*adresse*/}
                            <li className="flex flex-col p-2 border-l-2 border-orange-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm">
                                    Nom de l'annexe
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-orange-700"></div>
                <div className="flex justify-between p-4">

                <div className="bloc space-y-4">
                    <div>
                        <h6 className="font-bold text-orange-500">Date de la facture: <span className="text-sm font-medium text-black"> 12/12/2022</span></h6>
                    </div>
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold text-orange-500">Facture n°: </span>
                            BA202300012                    
                         </address>
                    </div >
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold text-orange-500">Client: </span>
                            uhedhzvcbqxnhsj
                        </address>
                    </div>
                </div>

                <div className="bloc space-y-4">
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold text-orange-500">Vendeur: </span>
                            odjddjddnnbncncbcb                     
                         </address>
                    </div>
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold text-orange-500">Moyen de payement: </span>
                            dnnbncncbc                    
                         </address>
                    </div>
                </div>

                <div className="bloc space-y-4">
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold text-orange-500"> Dépôt: </span>
                            lzken                    
                         </address>
                    </div>
                    </div>
                    <div></div>
                </div>
                <div className="flex justify-center p-4">
                    <div className="border-b border-gray-200 shadow">
                        <table className="">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Produit
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Quantité
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Prix HT
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Prix TTC
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Montant HT
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Réduction
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                           Produit 1
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">4</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $20
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $10
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $50
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $40
                                    </td>
                                    <td className="px-6 py-4">
                                        $30
                                    </td>
                                </tr>
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        2
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            pjhgbbbbbbbbvdfgh
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">2</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $60
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $60
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $60
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $60
                                    </td>
                                    <td className="px-6 py-4">
                                        $12
                                    </td>
                                </tr>
                                <tr className="border-b-2 whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        3
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            Produit 3 
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">1</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $10
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $10
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $10
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        $10
                                    </td>
                                    <td className="px-6 py-4">
                                        $13
                                    </td>
                                </tr>
                                <tr className="">
                                    <td col-span="3"></td>
                                    <td className="text-sm font-bold"> Total</td>
                                    <td className="text-sm font-bold tracking-wider"><b>$950</b></td>
                                </tr>
                                {/*end tr*/}
                                <tr>
                                    <th col-span="3"></th>
                                    <td className="text-sm font-bold"><b>TVA</b></td>
                                    <td className="text-sm font-bold"><b>18%</b></td>
                                </tr>
                                {/*end tr*/}
                                <tr className="text-white bg-gray-800">
                                    <th col-span="3"></th>
                                    <td className="text-sm font-bold"><b>Total Global</b></td>
                                    <td className="text-sm font-bold"><b>$999.0</b></td>
                                </tr>
                                {/*end tr*/}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-between p-4">
                    <div>
                        <h3 className="text-xl text-orange-500">Terms And Condition :</h3>
                        <ul className="text-xs list-disc list-inside">
                            <li>Tous les comptes doivent être payés dans les 7 jours suivant la réception de la facture..</li>
                            <li>A payer par chèque ou carte de crédit ou par paiement direct en ligne.</li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <h3>Signature</h3>
                        <div className="text-4xl italic text-orange-500">AAA</div>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-orange-700"></div>

                <div className="p-4">
                    <div className="flex items-center justify-center">
                    Merci beaucoup de faire affaire avec nous.                    
                    </div>
                </div>

            </div>
        </div>
</div>
</DashboardLayout>
    );
}