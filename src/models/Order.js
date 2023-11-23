const { default: mongoose } = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    note: String,
    phone: {
        type: String,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    cart: [{
        product: {
            type: mongoose.ObjectId,
            required: true,
            ref: 'product'
        },
        quantity: {
            type: Number,
            reuqired: true
        }
    }],
    voucher: {
        type: mongoose.ObjectId,
        ref: 'voucher'
    }
}, { timestamps: true });

orderSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Order = mongoose.model('order', orderSchema);

module.exports = Order