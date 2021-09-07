import express from 'express';
const router = express.Router();
import { getMosaicById, getMosaics } from '../controllers/mosaicController.js'

router.route('/').get(getMosaics);
router.route('/:id').get(getMosaicById);

export default router;