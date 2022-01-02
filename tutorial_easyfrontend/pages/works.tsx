import { MainLayout } from '@/components/layout';
import { Box } from '@mui/material';
import React from 'react';

export interface WorksPageProps {
}

function WorksPage (props: WorksPageProps) {
  return (
    <Box>Works Page</Box>
  );
}

export default WorksPage

// File _app.tsx của pages ta sẽ get Layout này về. Ta chỉ định dùng MainLayout cho WorksPage. Layout là thuộc tính ta tự thêm
WorksPage.Layout = MainLayout