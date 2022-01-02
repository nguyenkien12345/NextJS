import avatar from '@/images/avatar.png';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

function HeroSection () {
  return (
    <Box component="section" pt={{xs: 4, md: 18}} pb={{xs: 7, md: 9}}>
      <Container>
          <Stack
          spacing={4}  
          direction={{xs: 'column-reverse', md: 'row'}} 
          alignItems={{xs: 'center', md: 'flex-start'}} 
          textAlign={{xs: 'center', md: 'left'}}>
            <Box>
                <Typography component="h1" variant="h3" fontWeight="bold" mb={{xs: 3.5, md: 5}}>
                    Hi, I am Kien, <br/>Developer FrontEnd
                </Typography>
                <Typography mb={{xs: 3.5, md: 5}}>
                    Front end developers are computer programmers who specialize in website design. Front end developer duties include determining the structure and design of web pages, striking a balance between functional and aesthetic design, and ensuring web design is optimized for smartphones.
                </Typography>
                <Button variant="contained" size="large">
                    Download Resume
                </Button>
            </Box>

            <Box sx={{minWidth: "240px", boxShadow: "-5px 13px", color: "secondary.light", borderRadius: "50%"}}>
                <Image src={avatar} layout='responsive' alt="Nguyễn Trung Kiên"/>
            </Box>
          </Stack>
      </Container>
    </Box>
  );
}

export default HeroSection

// Xây dựng giao diện
// Section (Box)
//   Container
//    Flex-Container (Stack) 
//      Flex-item (Box Left)
//        h1
//        p
//        button
//      Flex-item (Box Right) 
//        Image 

