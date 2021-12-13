import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link'

// Client Side Rendering

function Index() {

    const router = useRouter();
    console.log("Router: ", router.query.id);

    function handleOnClick() {
        router.push('/login')
    }

    return (
        <>
            <Head>
                <title>Next Js - Admin/User/[id]</title>
            </Head>
            <h1>Admin/User/{router.query.id}</h1>
            <Link href={'/login'}>
                <a className="active">Go To Login Page</a>
            </Link>
            <button onClick={handleOnClick}>Go To Login Page</button>
        </>
    );
}

export default Index;