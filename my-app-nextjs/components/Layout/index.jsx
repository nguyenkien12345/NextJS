import Head from 'next/head';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../Navbar';

function Layout({children}) {
    return (
        <Container>
            <Head>
                <meta charSet="UTF-8"/>
	            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Nguyễn Trung Kiên's Next App</title>
            </Head>

            <header>
                <Navbar/>
            </header>


            {/* Prop children: Chính là component chứa nd thay đổi của trang web (Lưu ý bắt buộc phải là prop children)*/}
            <main>{children}</main>
        </Container>
    )
}

export default Layout;
