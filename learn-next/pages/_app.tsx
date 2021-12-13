import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Ta sẽ xử lý phần chung của tất cả các trang (html,css) ở đây. Đây là 1 file global

function MyApp({ Component, pageProps }: AppProps) {
  // Component: Đại diện cho 1 page macth với URL. Trong từng cái page nó sẽ được truyền vào nhiều props
  return <Component {...pageProps} />
}
export default MyApp
