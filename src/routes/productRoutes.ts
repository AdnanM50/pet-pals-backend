// src/routes/productRoutes.ts
import express from 'express';

import { uploadProductImages } from '../middleware/productmulter';
import { createProduct } from '../controllers/productController';


const router = express.Router();

router.post('/createProduct', uploadProductImages, createProduct);

export default router;
