import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './userModel';
interface IEarning extends Document {
    sellerId: mongoose.Types.ObjectId;
    totalEarnings: number;
    totalWithdraw: number;
    availableBalance: number;
    earningHistory: {
        amount: number;
        date: Date;
    }[];
}

const earningsSchema: Schema<IEarning> = new Schema({
    sellerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    totalEarnings: { type: Number, default: 0 },
    totalWithdraw: { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    earningHistory: [{
        amount: { type: Number, required: true },
        date: { type: Date, required: true }
    }]
}, { timestamps: true });

const Earning: Model<IEarning> = mongoose.model<IEarning>('Earning', earningsSchema);
export default Earning;
