import express from 'express';

import { createPuppy, getAllPuppies, getPuppy, updatePuppy, deletePuppy } from '../controllers/puppy.controller';

const router = express.Router();

router.post('/createPuppy', createPuppy);
router.get('/puppies', getAllPuppies);
router.get('/puppy/:id', getPuppy); 
router.put('/updatePuppy/:id', updatePuppy);
router.delete('/deletePuppy/:id', deletePuppy);
export default router;