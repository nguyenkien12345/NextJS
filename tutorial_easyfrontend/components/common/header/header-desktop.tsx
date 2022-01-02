// Đổi tên Link thành MuiLink để không trùng với Link của next/link
import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import clsx from 'clsx'; // Sinh ra class
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES_LIST } from './routes';

function HeaderDesktop () {

  const router = useRouter();

  return (
    // Nếu màn hình là điện thoại thì ẩn, còn nếu màn hình là máy tính thì hiện
    <Box component="header" display={{xs: 'none', md: 'block'}} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTES_LIST.map((route) => (
            <Link key={route.label} href={route.path} passHref>
              {/* Nếu đường dẫn hiện tại trên trình duyệt trùng với đường dẫn route hiện tại thì thêm class active */}
              <MuiLink sx={{ ml: 2, fontWeight: 'medium'}} className={clsx({active: router.pathname === route.path})}>
                {route.label}
              </MuiLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export { HeaderDesktop };

