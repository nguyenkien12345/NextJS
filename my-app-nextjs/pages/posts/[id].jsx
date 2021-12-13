import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { PostsApi } from '../../apis/posts';
import Layout from '../../components/Layout';

export const getStaticPaths = async() => {
    try{
        const paths = await PostsApi.getAllId(5);
        console.log('All ID: ', paths);
        return {
            paths,
            fallback: true 
        }
    }
    catch(error){
        console.log(error);
    }
}

// params: Toàn bộ params sẽ được móc ra từ paths
export const getStaticProps = async({params}) => {
    try{
        const post = await PostsApi.getDetail(params.id);
        return { 
            props: { post: post },
            revalidate: 1
        }
    }
    catch(error){
        console.log(error);
    }
}

// Móc ra props post thông qua getStaticProps
function PostDetail({post}) {

    const router = useRouter();

    // Nếu trang id bạn truy cập chưa được tạo ra sẵn (chưa được gọi trước đó) => isFallback của router là true và trang tạm thời (ở đây ta sẽ dùng Spinner) sẽ được hiển thị ra
    if(router.isFallback){
        return (
            <Spinner animation='border' role='status' variant='dark'>
                <span className='sr-only'>LOADING.....</span>
            </Spinner>
        )
    }

    // Khi getStaticProps() Chạy xong lần đầu tiên. 
    // Giả sử ta chạy trang số 6 thì sau khi chạy xong lần đầu tiên nó sẽ đưa trang số 6 này vào các trang dữ liệu tĩnh fix cứng luôn, ở lần chạy thứ 2 nó đã có sẵn trong danh sách lấy ra trước đó (dữ liệu fix cứng) nên nó chỉ việc hiển thị ra chứ ko cần phải LOADING lại nữa
    else{
        return (
            <Layout>
                <Card className='my-3 shadow'>
                    <Card.Body>
                        <Card.Title>{post.title.toUpperCase()}</Card.Title>
                        <Card.Text>{post.body}</Card.Text>
                        <Link href="/posts">
                            <Button variant='dark'>Quay Lại</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Layout>
        )
    }
}

export default PostDetail;

// Lý thuyết

// + Bắt buộc phải đặt tên là getStaticPaths (Đây là tên của 1 function nhất định của NextJs). Nó sẽ trả về các đường dẫn tương ứng.

// + getStaticPaths: Khi mà chúng ta chạy build để biến nó thành sản phẩm thì nó sẻ gửi cái request này trước và nó chuyển data nhận về thành toàn bộ html cứng. Khi mà người dùng truy cập cái trang này thì nó sẽ không tạo ra 1 cái request gửi lên server nữa, nó chỉ thực hiện 1 lần duy nhất khi mà build sản phẩm  và lúc này chỉ việc hiển thị dữ liệu đã lưu trước đó ra. 

// + fallback: false: Bất kì đường dẫn nào không được trả về bởi getStaticPaths sẽ trả về trang 404 (Chúng ta có tổng 10 posts nhưng ta chỉ cho nó lấy cứng 5 posts đầu thì nó sẽ tự động đi lấy 5 id tương ứng của các cái post đó về. Nếu truyền vào cái id thứ 6 trở đi thì nó sẽ trả về trang 404 vì lúc này nó hiểu những id đó).

// + fallback: true: Path nào không return ngay lập tức (nghĩa là trước đó ta ko chỉ định getStaticPaths lấy ra sẵn để fix html cứng, ta mới chỉ định getStaticPaths lấy trước 5 id đầu còn những id 6,7,8,9,10 thì chưa có) thì lúc này nó sẽ show ra trang tạm thời (ta tự đinh nghĩa trang này, ở đây ta sẽ dùng spinner) và đợi cho đến khi nào thằng getStaticProps chạy xong hoàng toàn thì nó mới lấy được cái id theo yêu cầu và hiển thị lên. 

// + revalidate: 1 Gửi đi 1 request kiểm tra xem bên database|api có cập nhật, thay đổi gì hay không để nó pre render và load lại lấy về nội dung được cập nhật đó sau đó câp nhật hardcode (fix cứng html lại) và hiển thị ra 
// VD: Ta đang đứng trong post số 7, giả sử trên database có cập nhật thay đổi tiêu đề, nội dung của post này mà trước đó post 7 này đã được gọi trong getStaticPaths nghĩa là dữ liệu của thằng này đã được lấy trước đó và fix html cứng. Nhưng với revalidate: 1 thì nó sẽ gửi đi 1 request kiểm tra trên database thấy thằng này có sự thay đổi và nó sẽ cập nhật lại nội dung và pre render sau đó hardcode (fix cứng html lại) và hiển thị ra cho người dùng 
// revalidate: 1 Diễn ra nhiều lần 1 lần trong vòng 1s, revalidate: 10 Diễn ra nhiều lần 10 lần trong vòng 1s

