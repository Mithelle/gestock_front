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
            router.push('/login');
        }
    }, [])

    if(!isAuth) {
        return <div>Loading</div>;
    }

    return <>
        {children}
    </>
} 