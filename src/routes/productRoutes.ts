
import express from 'express';

import { uploadProductImages } from '../middleware/productmulter';
import { createProduct,updateProduct, deteleproduct,singleProduct, getAllProducts } from '../controllers/productController';
// import { isAdmin } from '../middleware/adminUser.middleware';


const router = express.Router();

router.post('/createProduct',uploadProductImages, createProduct);
router.put('/updateProduct/:id',uploadProductImages, updateProduct);
router.delete('/deleteProduct/:id',deteleproduct);
router.get('/singleProduct/:id',singleProduct);
router.get('/allproducts',getAllProducts);

export default router;
