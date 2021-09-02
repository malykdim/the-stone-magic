import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Mosaic from '../models/mosaicModel.js';

// @desc    Fetch all mosaics
// @route   GET /api/mosaics
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const mosaics = await Mosaic.find({});
    
    res.json(mosaics);
}));

// @desc    Fetch single mosaic
// @route   GET /api/mosaics/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const mosaic = await Mosaic.findById(req.params.id);
    
    if (mosaic) {
        res.json(mosaic);
    } else {
        res.status(404);
        throw new Error('Mosaic not found');
    }
}));

export default router;