import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import React from 'react';

export interface PostListPageProps {
  posts: any[]
}

function PostListPage ({posts}: PostListPageProps) {
  return (
      <div>
        <h1>List Post Page</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link href={`posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
  );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async(context: GetStaticPropsContext) => {
  // getStaticProps chỉ chạy ở phía server-site
  // Run lúc build-time
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();
  
  return{
    props: {
      // Ta không muốn lấy toàn bộ thông tin của bài post mà chỉ lấy id và title của bài post thôi 
      posts: data.data.map((x: any) => ({id: x.id, title: x.title}))
    }
  }
}

export default PostListPage;
