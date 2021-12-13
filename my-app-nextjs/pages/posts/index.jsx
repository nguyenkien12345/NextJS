import Link from 'next/link';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { PostsApi } from '../../apis/posts';
import Layout from '../../components/Layout';

// Get static data from backend|database|api (Lấy dữ liệu tĩnh)
export const getStaticProps = async() => {
    try{
        const posts = await PostsApi.getAll(10);
        console.log('All Posts: ', posts);
        return { props: { posts: posts } };
    }
    catch(error){
        console.log(error);
    }
}

// Móc ra props posts thông qua getStaticProps
function Posts({posts}) {
    return (
        <Layout>
            {posts.map(post => (
                <Card key={post.id} className='my-3 shadow'>
                    <Card.Body>
                        <Card.Title>{post.id} - {post.title.toUpperCase()}</Card.Title>
                        <Card.Text>{post.body}</Card.Text>
                        <Link href={`/posts/${post.id}`} passHref>
                            <Card.Link>See more</Card.Link>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </Layout>
    )
}

export default Posts;

// Lý thuyết

// + Bắt buộc phải đặt tên là getStaticProps (Đây là tên của 1 function nhất định của NextJs). Nó sẽ trả về các props.

// + getStaticProps: Khi mà chúng ta chạy build để biến nó thành sản phẩm thì nó sẻ gửi cái request này trước và nó chuyển data nhận về thành toàn bộ html cứng. Khi mà người dùng truy cập cái trang này thì nó sẽ không tạo ra 1 cái request gửi lên server nữa, nó chỉ thực hiện 1 lần duy nhất khi mà build sản phẩm  và lúc này chỉ việc hiển thị dữ liệu đã lưu trước đó ra.
