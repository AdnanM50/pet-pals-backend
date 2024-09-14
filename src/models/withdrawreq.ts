import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './userModel';
interface IWithdrawRequest extends Document {
    sellerId: mongoose.Types.ObjectId;
    amount: number;
    preferredPaymentMethod: string;
    accountDetails: string;
    status: 'pending' | 'approved' | 'rejected';
}

const withdrawRequestSchema: Schema<IWithdrawRequest> = new Schema({
    sellerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    preferredPaymentMethod: { type: String, required: true },
    accountDetails: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    }
}, { timestamps: true });

const WithdrawRequest: Model<IWithdrawRequest> = mongoose.model<IWithdrawRequest>('WithdrawRequest', withdrawRequestSchema);
export default WithdrawRequest;
