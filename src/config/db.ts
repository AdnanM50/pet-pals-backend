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


// PORT=8080
// DATABASE_URL=mongodb+srv://mdadnanhossain88:AsBTvoZ2IrAKrvSk@cluster0.bxc6yor.mongodb.net/petshopBackend?retryWrites=true&w=majority&appName=Cluster0/Bookshop
// NODE_ENV=development
// CORS_ORIGIN=*
// JWT_SECRET=mysecretkey