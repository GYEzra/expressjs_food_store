const { default: mongoose } = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    categories: {
        type: mongoose.ObjectId,
        ref: 'category',
    },
    description: {
        type: String
    },
    feedbacks: [{
        type: mongoose.ObjectId,
        ref: 'feedback',
    }]
}, { timestamps: true });

productSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Product = mongoose.model('product', productSchema);

module.exports = Product