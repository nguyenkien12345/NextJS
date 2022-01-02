import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    if(req.method !== 'GET'){
        return res.status(404).json({ name: `Method ${req.method} not supported` });
    }
    
    res.status(200).json({ name: 'CATCH ALL PATHS OF PRODUCTS' })
}