import asyncHandler from 'express-async-handler';
import Mosaic from '../models/mosaicModel.js';

// @desc    Fetch all mosaics
// @route   GET /api/mosaics
// @access  Public
const getMosaics = asyncHandler(async (req, res) => {
    const mosaics = await Mosaic.find({});
    
    res.json(mosaics);
});


// @desc    Fetch single mosaic
// @route   GET /api/mosaics/:id
// @access  Public
const getMosaicById = asyncHandler(async (req, res) => {
    const mosaic = await Mosaic.findById(req.params.id);
    
    if (mosaic) {
        res.json(mosaic);
    } else {
        res.status(404);
        throw new Error('Mosaic not found');
    }
});

// @desc    Delete a mosaic
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteMosaic = asyncHandler(async (req, res) => {
    const mosaic = await Mosaic.findById(req.params.id);
    
    if (mosaic) {
        await mosaic.remove();
        res.json({ message: 'Mosaic removed' });
    } else {
        res.status(404);
        throw new Error('Mosaic not found');
    }
});

export { getMosaics, getMosaicById, deleteMosaic };