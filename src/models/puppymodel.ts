
import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './userModel';

interface IPuppy extends Document {
    sellerId: mongoose.Types.ObjectId;
    name: string;
    breed: string;
    gender: 'Male' | 'Female';
    age: number;
    price: number;
    description: string;
    images: string[];
    videoLink?: string;
    isActive: boolean;
}

const puppySchema: Schema<IPuppy> = new Schema({
    sellerId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', // Reference the user who is the seller
        required: true 
    },
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    videoLink: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Puppy: Model<IPuppy> = mongoose.model<IPuppy>('Puppy', puppySchema);
export default Puppy;
