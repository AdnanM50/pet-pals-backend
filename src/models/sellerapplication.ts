import mongoose, { Document, Model, Schema } from 'mongoose';
import User from './userModel';
interface ISellerApplication extends Document {
    userId: mongoose.Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
    appliedAt: Date;
    approvedAt?: Date;
}

const sellerApplicationSchema: Schema<ISellerApplication> = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    approvedAt: {
        type: Date
    }
}, { timestamps: true });

const SellerApplication: Model<ISellerApplication> = mongoose.model<ISellerApplication>('SellerApplication', sellerApplicationSchema);
export default SellerApplication;
