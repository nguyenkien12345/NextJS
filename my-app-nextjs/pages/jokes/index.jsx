import Link from 'next/link';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { JokesApi } from '../../apis/jokes';
import Layout from '../../components/Layout';

// Lấy dữ liệu kiểu động (Kiểu dữ liệu luôn thay đổi, không giống nhau)
export const getServerSideProps = async () => {
    try{
        const joke = await JokesApi.getRandomJoke();
        if(!joke){
            return {
                redirect: {
                    destination: '/posts',
                    permanent: false
                }
            }
        }
        return { props: {joke:joke}};
    }
    catch(error){
        console.log(error);
    }
}

function Jokes({joke}) {
    return (
        <Layout>
            <Card className='my-3 shadow'>
                <Card.Body>
                    <Card.Title>Here's Your Random Joke For Today</Card.Title>
                    <Card.Text>{joke.value}</Card.Text>
                    <Link href='/'>
                        <Button variant='dark'>Back</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Layout>
    )
}

export default Jokes;

// Lý thuyết

// + Bắt buộc phải đặt tên là getServerSideProps (Đây là tên của 1 function nhất định của NextJs). Nó sẽ trả về các props.