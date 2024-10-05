import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/productmodel';
import User from '../models/userModel';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId, name, category, price, brand, weight, description, status } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        if (user.role !== 'admin' && user.role !== 'seller') {
            return res.status(403).json({
                message: 'Permission denied. Only admins and sellers can create products.',
            });
        }

        const thumbnail = req.files && 'thumbnail' in req.files ? (req.files['thumbnail'] as Express.Multer.File[])[0].path : '';
        const images = req.files && 'images' in req.files ? (req.files['images'] as Express.Multer.File[]).map(file => file.path) : [];

        const newProduct = new Product({
            sellerId: new mongoose.Types.ObjectId(userId), 
            name,
            category: new mongoose.Types.ObjectId(category),
            price,
            brand,
            weight,
            status,
            description,
            thumbnail,
            images,
        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating product',
            error: (error as Error).message,
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, category, price, brand, weight, description, status } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            category: new mongoose.Types.ObjectId(category),
            price,
            brand,
            weight,
            description,
            status,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating product',
            error: (error as Error).message,
        });
    }
};

export const deteleproduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: (error as Error).message,
        });
    }
};


export const singleProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.status(200).json({
            message: 'Product retrieved successfully',
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving product',
            error: (error as Error).message,
        });
    }
};


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            message: 'Products retrieved successfully',
            products,
        });
    } catch (error) {   
        res.status(500).json({
            message: 'Error retrieving products',
            error: (error as Error).message,
        });
    }
};