const Feedback = require('../models/Feedback.js')
const Product = require('../models/Product.js')
const Order = require('../models/Order.js')
const aqp = require('api-query-params');

const gFeedbacks = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page || queryString) {
            let offset = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;

            result = await Feedback.find(filter)
                .skip(offset)
                .limit(limit)
                .populate('product')
                .populate('user')
                .exec();
        } else {
            result = await Feedback.find({})
                .populate('product')
                .populate('user');
        }
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const gFeedback = async (id) => {
    try {
        let result = await Feedback.findOne({ _id: id })
            .populate('product')
            .populate('user');
        return result;
    } catch (error) {
        return error;
    }
}

const cFeedback = async (data) => {

    try {
        let feedback = await Feedback.create(data);

        if (feedback) {
            await Product.updateOne({ _id: data.product }, { $addToSet: { feedbacks: feedback._id } });
        }
        return result;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const uFeedback = async (data) => {
    try {
        let result = await Feedback.updateOne({ _id: data._id }, { ...data });
        return result
    } catch (error) {
        return error;
    }
}

const dFeedback = async (id) => {
    try {
        let result = await Feedback.deleteById(id);
        return result
    } catch (error) {
        return error;
    }
}

module.exports = {
    gFeedback, cFeedback, uFeedback, dFeedback, gFeedbacks
}