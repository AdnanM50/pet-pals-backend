import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/auth.route';
import adminRoutes from './routes/adminUser.route';
import categoryRoutes from './routes/productcategoryRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app: Application = express();
app.use(cookieParser());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

export default app;
