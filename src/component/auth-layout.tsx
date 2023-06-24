import { useMe } from "@/features/auth"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import ShouldCreateCompany from "./gates/should-create-company";

export default function AuthLayout({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const { data, isLoading, isSuccess, isError } = useMe();
    const router = useRouter();

    // useEffect(() => {
    //     if(Cookies.get('token') && isSuccess) {
    //         setIsAuth(true);
    //     }
    //     if(isError) {
    //         router.push('/auth/login');
    //     }
    // }, [data])

    if(!isAuth && isLoading) {
        return <div className="flex items-center h-screen w-full">
            <span className="loading loading-ring loading-lg"></span>
        </div>;
    }

    return <>
    {/*<ShouldCreateCompany user={data?.data}>*/}
        {children}
    {/*</ShouldCreateCompany>*/}
    </>
}
