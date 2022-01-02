import { Box } from '@mui/material';
import React from 'react';

function HeaderMobile () {
  return (
    // Nếu màn hình là điện thoại thì hiện, còn nếu màn hình là máy tính thì ẩn
    <Box component="header" display={{xs: 'block', md: 'none'}}>Header Mobile</Box>
  );
}

export { HeaderMobile };