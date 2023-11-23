const { default: mongoose } = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const voucherSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true
    },
    description: String,
    discount: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    expired_date: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    }
}, { timestamps: true });

voucherSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const voucher = mongoose.model('voucher', voucherSchema);

module.exports = voucher