import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const mosaicSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },    
    caption: {
        type: String,
        required: true,
        // unique: true
    },
    author: {
        type: String,
        required: true,        
    },
    image: {
        type: String,
        required: true
    },
    url: {
        type: String,        
    },
    price: {
        type: Number,
        default: 0
    },
    width: {
        type: Number,
        default: 75
    },
    height: {
        type: Number,
        default: 75
    },
    materials: {
        type: [],
        default: []
    },
    numReviews: {
        type: Number,
        required: false
    },
    reviews: [ reviewSchema ],
    rating: {
        type: Number,
        required: false
    },
    countInStock: {
        type: Number,
        default: 1
    },
}, {
    timestamps: true
});

const Mosaic = mongoose.model('Mosaic', mosaicSchema);

export default Mosaic;