import Link from "next/link";
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent(){
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>My Next App</Navbar.Brand>
            <Nav>
                <Link href='/' passHref>
                    <Nav.Link>Home</Nav.Link>
                </Link>
                <Link href='/posts' passHref>
                    <Nav.Link>Posts</Nav.Link>
                </Link>
                <Link href='/books' passHref>
                    <Nav.Link>Books</Nav.Link>
                </Link>
                <Link href='/jokes' passHref>
                    <Nav.Link>Jokes</Nav.Link>
                </Link>
                <Link href='/contact' passHref>
                    <Nav.Link>Contact</Nav.Link>
                </Link>
                <Link href='/about' passHref>
                    <Nav.Link>About</Nav.Link>
                </Link>
            </Nav>
        </Navbar>
    )
}

export default NavbarComponent;

// Lý thuyết

// Mặc định cái Link ở bên dưới (phía bên trong cấu trúc) của nó là <a href=''></a> và thằng Nav.Link cũng tương tự ik chang nên lúc này nó đang bị đúp thẻ a do đó khi click vào link sẽ không thấy có hiện tượng gì xảy ra nên ta cần phải thêm passHref để nextjs hiểu và bik phải chạy thằng Link chứ không phải Nav.Link