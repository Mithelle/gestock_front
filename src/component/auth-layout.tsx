import { me } from "@/features/auth"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function AuthLayout({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(Cookies.get('token')) {
            setIsAuth(true);
        } else {
            router.push('/auth/login');
        }
    }, [])

    if(!isAuth) {
        return <div className="flex items-center h-screen w-full">
            <span className="loading loading-ring loading-lg"></span>
        </div>;
    }

    return <>
        {children}
    </>
}
