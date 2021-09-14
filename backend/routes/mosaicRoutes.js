import express from 'express';
const router = express.Router();
import { createMosaic, deleteMosaic, getMosaicById, getMosaics, updateMosaic } from '../controllers/mosaicController.js'
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/')
    .get(getMosaics)
    .post(protect, admin, createMosaic);
router.route('/:id')
    .get(getMosaicById)
    .delete(protect, admin, deleteMosaic)    
    .put(protect, admin, updateMosaic);

export default router;