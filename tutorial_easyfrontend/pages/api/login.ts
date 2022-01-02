import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

type Data = {
    message: string,
}

const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   return new Promise((resolve) => {
    if(req.method !== 'POST'){
        res.status(404).json({message: `Method ${req.method} is not supported at Login Page`})
    }

    // Do not send cookies to API server (Override cookie). 
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
        let body = ''
        // Listen streaming data 
        proxyRes.on('data', function(snapshot){
            body += snapshot
        })

        // Listen streaming data done 
        proxyRes.on('end', function(){
            try {
                // Get accessToken, expiredAt from API_SERVER
                const { accessToken, expiredAt  } = JSON.parse(body);
                console.log({accessToken, expiredAt});

                // Convert token to Cookies (add secure for environment production)
                const cookies = new Cookies(req,res, {secure: process.env.NODE_ENV !== 'development'});
                cookies.set('access_Token', accessToken, { // Đặt tên cookies này là access_Token
                    httpOnly: true,
                    sameSite: 'lax',
                    expires: new Date(expiredAt)
                });

                // When the user sends a login request to the server, to return an object must convert res to NextApiResponse
                (res as NextApiResponse).status(200).json({message: 'Login successfully'});
                // throw new Error('Something went wrong'); // Test trường hợp có lỗi
            } catch (error) {
                (res as NextApiResponse).status(500).json({message: 'Login failed'});
            }
            resolve(true);
        })
    }

    proxy.once('proxyRes',handleLoginResponse)

    proxy.web(req, res, {
        target: process.env.API_URL, 
        changeOrigin: true,
        // Cái Response này dev muốn tự xử lý và trả về kết quả thông qua hàm handleLoginResponse chứ không cần proxy tự xử lý
        selfHandleResponse: true,
    })  
    
   })
}

export const config = {
    api: {
        bodyParser: false,
    }
}