// Copy file theme.ts trong folder src từ https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/nextjs-with-typescript?file=/src/theme.ts:0-332
import { red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance.
let theme = createTheme({
  typography: {
    fontFamily: 'Heebo, sans-serif'
  },
  palette: {
    primary: {
      main: '#FF6464',
    },
    secondary: {
      light: '#EDF7FA',
      main: '#00A8CC',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#21243D"
    }
  },
  components: {
    // Khi ghi đè thuộc tính của components nào đó thì nó luôn luôn bắt đầu bằng từ Mui + tên component
    MuiContainer:{
      // Ở mỗi component đều có những default nhất định. Vd như component Container có props fixed có giá trị default là false
      defaultProps:{
        // default maxWidth của Container là 'lg'. Giờ sẽ cập nhật lại default maxWidth là 'md'
        maxWidth: 'md',
      },
      // Ghi đè lại giá trị của props
      styleOverrides:{
        maxWidthSm: {
          // Giá trị ban đầu của maxWidth: 'sm' là 600. Giờ mình sẽ cập nhật lại maxWidth: 'sm' có giá trị là 680
          maxWidth: '680px',
          '@media (min-width: 600px)': {
            maxWidth: '680px',
          }          
        },
        maxWidthMd: {
          // Giá trị ban đầu của maxWidth: 'md' là 900. Giờ mình sẽ cập nhật lại maxWidth: 'md' có giá trị là 860
          maxWidth: '860px',
          '@media (min-width: 900px)': {
            maxWidth: '860px',
          }   
        }
      },
      variants: []
    },
    MuiLink: {
      defaultProps:{
        // default underline của MuiLink là 'always'. Giờ sẽ cập nhật lại default underline là 'hover'
        underline: 'hover'
      },
      // Ghi đè lại giá trị của props
      styleOverrides:{
       root: {
        color: 'black',
        '&:hover, &.active': {
          color: '#FF6464'
        }
       }
      },
      variants: []
    },
    MuiButton: {
      variants: [
        {
          // Trường hợp component item của mình có 2 thuộc tính là variant: 'contained', color: 'primary' thì ghi đè color là white
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: 'white',
          }
        }
      ],
    }
  }
});

// Cách 2: Cách ghi đè thuộc tính của components nào đó
// Thay đổi style của thẻ h3
// theme.typography.h3 = {
//   fontSize: '2rem',
//   // Từ breakpoint md trở lên (900px đổ lên) thì custom (override) lại thẻ h3
//   [theme.breakpoints.up('md')]: {
//     fontSize: '3rem'
//   }
// }

// Cách 3: Cách ghi đè thuộc tính của components nào đó
theme = responsiveFontSizes(theme);

export { theme };

