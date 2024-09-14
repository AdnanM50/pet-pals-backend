import mongoose, { Schema, Document, Model } from 'mongoose';
import Service from './servicemodel';
import User from './userModel';

interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    sellerId: mongoose.Types.ObjectId;
    serviceId: mongoose.Types.ObjectId;
    bookingDate: Date;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const bookingSchema: Schema<IBooking> = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Types.ObjectId, ref: 'Service', required: true },
    bookingDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
        default: 'pending' 
    }
}, { timestamps: true });

const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
