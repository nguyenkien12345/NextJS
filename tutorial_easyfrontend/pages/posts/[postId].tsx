import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export interface PostPageProps {
  post: any;
}

function PostPage ({post}: PostPageProps) {

    const router = useRouter();

    if(router.isFallback){
      return(
        <div style={{backgroundColor: 'red', fontSize: '2rem', textAlign: 'center'}}>Loading.....</div>
      )
    }

    if(!post) return null;

  return (
    <div>
        <h1>Post Page</h1>
        <p>{post.title}</p>
			  <p>{post.author}</p>
			  <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async() => {
  // getStaticPaths chỉ chạy ở phía server-site
  // Run lúc build-time
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();
  
  return { 
      // postId: Tên file ta để là postId nên key cũng phải là postId
      paths: data.data.map((post:any) => ({params: {postId: post.id}})),
      // Nếu người dùng truy cập request mà postId của nó ko tồn tại thì trả về 404
      fallback: true
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async(context: GetStaticPropsContext) => {
  // getStaticProps chỉ chạy ở phía server-site
  // Run lúc build-time
  const postId = context.params?.postId

  if(!postId) return { notFound: true }

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await response.json();

  return { 
    props: {
      post: data
    },
    revalidate: 5
  }
}

export default PostPage;
