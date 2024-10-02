import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProduct extends Document {
    sellerId: mongoose.Types.ObjectId;
    name: string;
    category: mongoose.Types.ObjectId; 
    price: number;
    brand: string;
    weight: string;
    status: 'active' | 'inactive';
    description: string;
    thumbnail: string; 
    images: string[];   
}

const productSchema: Schema<IProduct> = new Schema({
    sellerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { type: String, required: true },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true 
    },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    weight: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },  
    images: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
export default Product;
