import {useMe} from "@/features/auth"
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {PropsWithChildren, useEffect, useState} from "react"
import ShouldCreateCompany from "./gates/should-create-company";
import { Loading } from "./loading";

export default function AuthLayout({children}: PropsWithChildren) {
    const [isAuth, setIsAuth] = useState(false);
    const {data, isLoading, isSuccess, isError, error} = useMe();
    const router = useRouter();

    useEffect(() => {
        // if(Cookies.get('token') && isSuccess) {
            // setIsAuth(true);
        // }
        if(error) {
            router.push('/auth/login');
            console.log(error.response)
        }
    }, [data])

    console.log({  });

    if (!isAuth && isLoading) {
        return <Loading />;
     }
    
    return <>
        <ShouldCreateCompany user={data?.data}>
        {children}
        </ShouldCreateCompany>
    </>
}
