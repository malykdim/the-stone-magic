import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            caption: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            mosaic: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Mosaic',
                required: true 
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }  
    },
    paymentMethod: {
        type: String, 
        required: true,
        default: 'PayPal'
    },
    paymentResult: {
        id: { type: String }, 
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    taxPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: 0.0,
        required: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: 0.0,
        required: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;