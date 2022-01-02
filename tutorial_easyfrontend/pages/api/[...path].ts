import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

// Khi user request lên NextJs nó sẽ bỏ cookie đi rồi sau đó nó sẽ chuyển qua domain https://js-post-api.herokuapp.com sau đó kêu proxy tự handle cái response (Tức là khi mà cái proxy này nó nhận được response từ api server thì nó sẽ trả kết quả về cho client luôn)
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
   return new Promise((resolve) => {
    // Get cookies when user Login. 
    const cookies = new Cookies(req,res);
    const accessToken = cookies.get('access_Token');
    if(accessToken){
        // Convert cookies to header Authorization (Bearer is type of token)
        req.headers.authorization = `Bearer ${accessToken}`;
    }

    // Do not send cookies to API server (Override cookie). 
    req.headers.cookie = '';

    // Cái user gọi lên là /api/posts. 
    // Cái mà mình sẽ forward là https://js-post-api.herokuapp.com/api/posts
    // => Trùng /api/posts
    proxy.web(req, res, {
        // My Server
        target: process.env.API_URL, 
        // posts/cities/students... => Dù ta không khai báo api cities hay students nhưng ta vẫn có thể gọi 2 thằng này nhờ proxy
        changeOrigin: true,
        // Khi mà cái proxy này nó nhận được response từ api server thì nó sẽ trả kết quả về cho client luôn (proxy xử lý chứ không phải do dev xử lý)
        selfHandleResponse: false,
    })    

    // Lắng nghe sự kiện proxyRes (proxy trả về response)
        proxy.once('proxyRes', () => {
            resolve(true);
        })
   })
}

export const config = {
    api: {
        bodyParser: false,
    }
}

// Trong trường hợp mà các bạn có sử dụng cái phần body tức là khi mà thằng user nó gửi request lên trên NextJS thì NextJS mặc định có parser cái phần body ra cho mình để mình có thể lấy được cái req.body. Nhưng trong trường hợp thêm, cập nhật thì mình không muốn parser cái thằng body này mà mình muốn nó chuyển tiếp cái phần body đó (hay còn là cái stream data) lên đến api server luôn thì lúc đó mình phải tắt cái bodyParser đi