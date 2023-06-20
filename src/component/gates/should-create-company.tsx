import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

export default function ShouldCreateCompany(props: PropsWithChildren<{user: any}>) {
    const {children, user} = props;
    const router = useRouter();

    useEffect(() => {
        if(user && !user.company_id) {
            router.push('/companies/add-company');        
        }
    }, [user])

    return <>{children}</>
}
