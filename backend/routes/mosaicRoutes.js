import express from 'express';
const router = express.Router();
import { deleteMosaic, getMosaicById, getMosaics } from '../controllers/mosaicController.js'
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/').get(getMosaics);
router.route('/:id').get(getMosaicById).delete(protect, admin, deleteMosaic);

export default router;