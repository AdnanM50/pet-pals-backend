import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './userModel';
interface IService extends Document {
    sellerId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    category: 'Grooming' | 'Training' | 'Veterinary';
    pricing: {
        basic: number;
        standard: number;
        premium: number;
    };
    availableTimes: { startTime: string; endTime: string }[];
    images: string[];
    faq: string[];
}

const serviceSchema: Schema<IService> = new Schema({
    sellerId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Grooming', 'Training', 'Veterinary'], 
        required: true 
    },
    pricing: {
        basic: { type: Number, required: true },
        standard: { type: Number, required: true },
        premium: { type: Number, required: true }
    },
    availableTimes: [{
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }],
    images: [{ type: String }],
    faq: [{ type: String }]
}, { timestamps: true });

const Service: Model<IService> = mongoose.model<IService>('Service', serviceSchema);
export default Service;
