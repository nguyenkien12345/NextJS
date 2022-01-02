import { NextApiRequest, NextApiResponse } from 'next';

type Data = { 
    data: any[]; 
    pagination: any;
} | { name: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'GET'){
        return res.status(404).json({ name: `Method ${req.method} not supported` });
    }

    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10');
    if (response.ok){
        const responseJson = await response.json();
        res.status(200).json(responseJson)
    }
}