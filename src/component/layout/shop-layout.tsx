import { PropsWithChildren } from "react";
import DashboardLayout from "../Layout";
import Link from "next/link";

export function ShopLayout({children, title}: PropsWithChildren<{title: string}>) {
    return <>
        <DashboardLayout title={title} >
            <div className="tabs">
                <Link href="/shops" className="tab tab-bordered">Sites</Link> 
                <Link href="/shops/stores" className="tab tab-bordered">Dépôt</Link> 
                {/* <a className="tab tab-bordered"></a> */}
            </div>
            {children}
        </DashboardLayout>
    </>
}