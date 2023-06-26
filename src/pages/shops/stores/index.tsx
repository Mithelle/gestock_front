import DashboardLayout from "@/component/Layout";
import { ShopLayout } from "@/component/layout/shop-layout";
import { useGetAllShop, useGetAllStoreByShop } from "@/features/shop/shop.service";
import { useDeleteStore, useGetAllStore } from "@/features/store/store.service";
import { Button, Select, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axiosInstance from "@/utils/axios";


export default function StorelistPage(){
        const [shopId, setShopId] = useState('');
        const router = useRouter();
        const { data: storelist, refetch: refetchAllStoreByShop } = useGetAllStoreByShop(shopId);
        const { data: allStore, refetch } = useGetAllStore();

        const {data: allShop} = useGetAllShop();
        
        const deleteStore = useDeleteStore();
        function onDelete(id: string){
            axiosInstance.delete('/api/delDepot/' + id)
            .then(() => {
                refetch()
                refetchAllStoreByShop()
            })
            .catch(console.log)
        }
        function onSelectShop(value: string){
            setShopId(value)
        }
        
    return(
        <ShopLayout title="Nos annexes / Dépôts">
            

            <div className="relative overflow-x-auto  sm:rounded-lg">
                <div className="flex justify-between items-center my-6">
                    <Select
                        defaultValue="choisissez un site"
                        style={{ width: 200 }}
                        onChange={onSelectShop}
                    > 
                        { allShop !== undefined && allShop.data.data.map(shop => <Select.Option value={shop.id} >{shop.name}</Select.Option>) }
                    </Select>
                    <button className="btn btn-primary">
                        <Link href="/shops/stores/add-store">+ AJOUTER</Link>
                    </button>
            </div>

            <Table dataSource={ shopId ? storelist?.data.data : allStore?.data.data}>
                <Table.Column title='Nom' dataIndex={"name"} key={"id"} />
                <Table.Column title='Adresse' dataIndex={"adresse"} key={"id"} />
                <Table.Column title='Action'  
                                render={(value, record: any) =>{
                                    return <>
                                        <Button type="link" href={"/shops/stores/edit/" + record.id } >Modifier</Button>
                                        <Button type="link" onClick={ () => onDelete(value)}>Supprimer</Button>
                                    </>
                                
                                }}
                                dataIndex={"id"}
                                key={"id"} />
                </Table>

        </div>
        </ShopLayout>
    );

  }