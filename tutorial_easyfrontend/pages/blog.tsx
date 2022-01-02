import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'
import React from 'react'

export interface BlogPageProps {
}

function BlogPage (props: BlogPageProps) {
  return (
    <Box>Blog Page</Box>
  );
}

export default BlogPage

// File _app.tsx của pages ta sẽ get Layout này về. Ta chỉ định dùng MainLayout cho BlogPage. Layout là thuộc tính ta tự thêm
BlogPage.Layout = MainLayout