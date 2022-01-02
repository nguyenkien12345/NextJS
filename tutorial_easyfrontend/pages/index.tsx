import { RecentPosts } from '@/components/home';
import HeroSection from '@/components/home/hero';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models/common';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  // Cái nào không có trên path parameter nó sẽ tự động chuyển thành query params ([postId] chính là path parameter)
  const handleGoToDetailPage = () => {
    router.push({
      pathname: '/posts/[postId]',
      query: {
        postId: 12345,
        name: 'Nguyen Trung Kien',
        age: 21,
      },
    });
  };

  return (
    <Box>
      <HeroSection />
      <RecentPosts />
    </Box>
  );
};

export default Home;

// File _app.tsx của pages ta sẽ get Layout này về. Ta chỉ định dùng MainLayout cho Home. Layout là thuộc tính ta tự thêm
Home.Layout = MainLayout;
