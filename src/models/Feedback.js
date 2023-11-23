const { default: mongoose } = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    product: {
        type: mongoose.ObjectId,
        ref: 'product'
    },
    score: {
        type: Number,
        required: true
    },
    note: String
}, { timestamps: true });

feedbackSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback