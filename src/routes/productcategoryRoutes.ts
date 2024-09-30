import express from 'express';
import { createCategory, getAllCategories } from '../controllers/productCategoryController';
// import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Route to create a new category (admin only)
router.post('/category',  createCategory);

// Route to get all categories (admin only)
router.get('/categories',  getAllCategories);

export default router;
