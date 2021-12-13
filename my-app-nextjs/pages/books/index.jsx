import Link from 'next/link';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BooksApi } from '../../apis/books';
import Layout from '../../components/Layout';

export const getStaticProps = async () => {
    try{
        const books = await BooksApi.getBooks();
        return { props: {books:books}};
    }
    catch(error){
        console.log(error);
    }
}

function Books({books}) {
    return (
        <Layout>
            {books.map((book,index) => (
                <Card className='my-3 shadow' key={index}>
                    <Card.Body>
                        <Card.Title>{book.bookName}</Card.Title>
                        <Card.Text>{book.bookContent}</Card.Text>
                        <Link href='/'>
                            <Button variant='dark'>Back</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </Layout>
    )
}

export default Books;