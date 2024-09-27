import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    lastLogin: Date;
    isVerified: boolean;
    isSeller: boolean;
    resetPasswordToken?: string;
    resetPasswordExpiresAt?: Date;
    verificationToken?: string;
    verificationExpiresAt?: Date;
    image?: string;
    about?: string;
}

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: { 
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
    image: String,
    about: String
}, { timestamps: true });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
export type { IUser };
