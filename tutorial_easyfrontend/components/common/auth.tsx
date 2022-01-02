// File này sẽ đảm nhiệm vai trò Protected Pages đảm bảo user login vào rồi mới cho dùng những trang private
import { useAuth } from 'hooks/index';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthProps {
    children: any
}

function Auth({children}: AuthProps) {
 
    const router = useRouter();
    
    const {profile, firstLoading} = useAuth();

    useEffect(() => {
        // Nếu như nó đã loading xong rồi và nó vẫn chưa có được cái username
        if(!firstLoading && !profile?.username) {
            router.push('/login')
        }  
    }, [router, profile, firstLoading]);

    if(!profile?.username) return <p>Loading...</p>

    return(
        <div>{children}</div>
    )
}

export { Auth };

