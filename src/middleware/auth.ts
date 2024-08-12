// middleware/auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export const verifyToken = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
    return (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            (req as any).user = decoded;
            handler(req, res);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};
