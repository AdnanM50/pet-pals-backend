import { Request, Response } from 'express';
import Category from '../models/productcategory.model';

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }

    try {
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = new Category({ name });
        await category.save();

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name;
        await category.save();

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};