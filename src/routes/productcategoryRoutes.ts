import express from 'express';
import { createCategory, getAllCategories,updateCategory,deleteCategory } from '../controllers/productCategoryController';


const router = express.Router();


router.post('/createCategory',  createCategory);

router.get('/categories',  getAllCategories);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);
export default router;
