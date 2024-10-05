import express from 'express';
import { createCategory, getAllCategories,updateCategory,deleteCategory } from '../controllers/productCategoryController';


const router = express.Router();


router.post('/createCategory',  createCategory);

router.get('/categories',  getAllCategories);
router.put('/updateProduct/:id', updateCategory);
router.delete('/deletecategory/:id', deleteCategory);
export default router;
