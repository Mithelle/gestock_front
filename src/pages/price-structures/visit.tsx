import DashboardLayout from "@/component/Layout";
import { useGetAllProduct } from "@/features/product/product.service";
import { useDeletePackage, useGetAllPackageByProduct } from "@/features/package/packaging.service";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDeleteOrder } from "@/features/order/order.service";

export default function OrderViewPage(){
    const [productId, setProductId] = useState('');
        const router = useRouter();
        const { data: packagelist } = useGetAllPackageByProduct(productId);
        const {data: allProduct } = useGetAllProduct();

        const deleteOrder = useDeleteOrder();
        function onDelete(id: string){
            deleteOrder.mutate(id)
            router.reload();
        }
        function onSelectProduct(value: string){
            setProductId(value)
         }
return(
    <DashboardLayout>

<section >
<div className="flex items-top justify-center bg-gray-100">
    <div className="flex">
        <p>conditionnement:</p>
        <p {package_id}> {package.package}</p>
    </div>
</div>
</section>



</DashboardLayout>
);
}