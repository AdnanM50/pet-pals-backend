import { Request, Response } from 'express';
import User from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, 'name image role');

        res.status(200).json({
            success: true,
            users: users.map(user => ({
                name: user.name,
                image: user.image,
                role: user.role,
            })),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
        });
    }
};

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
                isVerified: user.isVerified,
                about: user.about,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user details',
        });
    }
};
