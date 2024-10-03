
import express from 'express';

import { uploadProductImages } from '../middleware/productmulter';
import { createProduct } from '../controllers/productController';
import { isAdmin } from '../middleware/adminUser.middleware';


const router = express.Router();

router.post('/createProduct',uploadProductImages, createProduct);

export default router;
