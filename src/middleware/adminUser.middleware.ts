import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).json({ message: 'Access denied, no token provided' });
        }

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

        const user = await User.findById(decodedToken.userID);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, only admins can access this route' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Access denied' });
    }
};
