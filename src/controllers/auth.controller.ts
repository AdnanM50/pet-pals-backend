import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/genarateTokenAndsetCookie';
import User, { IUser } from '../models/userModel';
// import { sendVerificationEmail } from '../mailtrap/email';

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        await user.save();
        generateTokenAndSetCookie(res, (user._id as string).toString());
        // await sendVerificationEmail(user.email, verificationToken);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { verificationToken } = req.body;
    try {
        const user = await User.findOne({ verificationToken });
        if (!user || !user.verificationExpiresAt || user.verificationExpiresAt.getTime() < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email }) as IUser;
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        // await sendPasswordResetEmail(user.email, resetToken);

        return res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({ resetPasswordToken: token });
        if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt.getTime() < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }) as IUser;
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, (user._id as string).toString());

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token').json({ message: "Logged out successfully" });
};

export const profileDetails = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationExpiresAt');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            user: {
                email: user.email,
                name: user.name,
                image: user.image,
                about: user.about,
                isSeller: user.isSeller,
                lastLogin: user.lastLogin,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};


export const updateProfile = async (req: Request, res: Response) => {
     const userId = (req as any).user.userId; // User ID from verified token

    const { name, email, image, about } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.image = image || user.image;
        user.about = about || user.about;

        await user.save();

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};