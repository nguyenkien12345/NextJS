import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

type Data = {
    message: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST'){
        res.status(404).json({message: `Method ${req.method} is not supported`})
    }

    const cookies = new Cookies(req,res);
    // If we are not set value for cookies, it will be null => Delete cookies
    cookies.set('access_Token');

    // When the user sends a logout request to the server, to return an object must convert res to NextApiResponse
    (res as NextApiResponse).status(200).json({message: 'Logout successfully'});
}

export const config = {
    api: {
        bodyParser: false,
    }
}