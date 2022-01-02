import { MainLayout, AdminLayout } from '@/components/layout';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// dynamic: Chỉ render bên phía client (browser), không render bên phía server (node) => ssr: false
// const Header = dynamic(() => import('@/components/common/header'), {ssr: false});

export interface AboutPageProps {}

function AboutPage(props: AboutPageProps) {
  const [postList, setPostLists] = useState([]);

  const router = useRouter();

  const page = router.query?.page;

  // useEffect này chỉ chạy bên phía client mà thôi không chạy bên phía server
  useEffect(() => {
    console.log('UseEffect');
    if (!page) return;

    (async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();
      setPostLists(data.data);
    })();
  }, [page]);

  const handleNextPage = () => {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 0) + 1,
        },
      },
      undefined,
      { shallow: true }
    ); // Trigger update lại cái routing bên phía client thôi không gọi lại getStaticProps (server)
  };

  return (
      <Box>
        <Typography component="h1" variant="h3" color="primary.main">About Page</Typography>
        {/* <Header /> */}
        <ul className="post-list">
          {postList.map((post: any) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
        <button onClick={handleNextPage}>Next Page</button>
      </Box>
  );
}

export default AboutPage;

// File _app.tsx của pages ta sẽ get Layout này về. Ta chỉ định dùng MainLayout cho AboutPage. Layout là thuộc tính ta tự thêm
AboutPage.Layout = AdminLayout;

export const getStaticProps = () => {
  console.log('Get StaticProps');
  return {
    props: {},
  };
};
