import express from 'express';
// import { isAdmin } from '../middleware/adminUser.middleware';
import { getAllUsers, getUserDetails } from '../controllers/adminUserlist.controller';


const router = express.Router();


router.get('/users',  getAllUsers);

router.get('/users/:id',  getUserDetails);

export default router;