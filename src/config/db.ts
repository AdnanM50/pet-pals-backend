import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    const error = err as Error;
    console.error(`Error: ${error.message}`);
  }
};
