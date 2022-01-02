// Xem file _app.tsx trong folder pages từ https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/nextjs-with-typescript?file=/src/theme.ts:0-332

import { EmptyLayout } from '@/components/layout';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import axiosClient from 'apis/axios-client';
import { AppPropsWithLayout } from 'models';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { createEmotionCache, theme } from '../utils';


// Bắt buộc phải để clientSideEmotionCache bên ngoài MyApp vì nó sẽ chỉ tạo ra 1 đối tượng cache duy nhất khi ta di chuyển, thay đổi giữa các trang. Lúc này css sẽ không bị lặp lại, hay cứ mỗi lần chuyển trang thì nó lại tự add thêm css và làm cho css bị lặp, trùng. Lúc này stle sẽ được cố định. Không nên để clientSideEmotionCache trong MyApp vì mỗi lần MyApp rerender nó sẽ tự động tạo ra 1 đối tượng cache mới
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppPropsWithLayout) {

  const Layout = Component.Layout || EmptyLayout;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp;

// File này thể hiện cho cơ chế hiển thị, chuyển trang trong NextJs giữa các component cũng như định nghĩa Layout hiển thị cho các trang

// Mỗi lần MyApp re-render thì nó chỉ thay đổi cái component còn các nội dung khác không thay đổi (Kiểu như Header, Footer giữa các trang giữ nguyên còn nội dung từng trang thì thay đổi)

// SWR
// + Nếu bạn muốn apply useSWR cho tất cả các hook thì bọc SWRConfig cho thằng cha to nhất (thằng mà bọc toàn bộ các thằng con)

// + <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}></SWRConfig> => Với việc bọc lại và sử dụng ở thằng cha cao nhất, mình sẽ không cần định nghĩa lại cái fetcher này cho từng cái hook useSWR nữa

// + shouldRetryOnError: Mỗi lần fetch Api bị fail thì nó sẽ retry lại để fetch api lại thì thường nó ít có khả năng thành công nên mình tắt luôn