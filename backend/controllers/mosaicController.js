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

// @desc    Create a mosaic
// @route   POST /api/products
// @access  Private/Admin
const createMosaic = asyncHandler(async (req, res) => {
    const mosaic = new Mosaic({
        caption: 'Mosaic Caption',
        author: 'Vladimir Damyanov',
        image: '/images/sample.jpg',        
        price: 0,
        width: 75,
        height: 75,
        materials: ['marble'],
        countInStock: 1,
        user: req.user._id,
        numReviews: 0
    });
    
    const createdMosaic = await mosaic.save();
    res.status(201).json(createdMosaic);
});

// @desc    Update a mosaic
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateMosaic = asyncHandler(async (req, res) => {
    const { caption, author, image, price, width, height, materials, countInStock } = req.body;
    
    const mosaic = await Mosaic.findById(req.params.id);
    
    if (mosaic) {
        mosaic.caption = caption;
        mosaic.author = author;
        mosaic.image = image;      
        mosaic.price = price;
        mosaic.width = width;
        mosaic.height = height;
        mosaic.materials = materials;
        mosaic.countInStock = countInStock;
        
        const updatedMosaic = await mosaic.save();
        res.json(updatedMosaic);
    } else {
        res.status(404);
        throw new Error('Mosaic not found');
    }
});

export { getMosaics, getMosaicById, deleteMosaic, createMosaic, updateMosaic };