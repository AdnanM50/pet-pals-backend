import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './userModel';

interface IProduct extends Document {
    sellerId: mongoose.Types.ObjectId;
    name: string;
    category: string; // Created only by Admin
    price: number;
    brand: string;
    weight: string; // Fixed unit: kg, gram, pound
    status: 'active' | 'inactive';
    description: string;
    images: string[];
}

const productSchema: Schema<IProduct> = new Schema({
    sellerId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    weight: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    description: { type: String, required: true },
    images: [{ type: String, required: true }]
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
export default Product;
