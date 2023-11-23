const Product = require('../models/Product.js')
const aqp = require('api-query-params');

const gProducts = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page || queryString) {
            let offset = (page - 1) * limit;
            const { filter, sort } = aqp(queryString);
            delete filter.page;

            result = await Product.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .populate('categories')
                .populate('feedbacks')
                .exec();
        } else {
            result = await Product.find({}).populate('categories').populate('feedbacks');
        }
        return result;
    } catch (error) {
        return error;
    }
}

const gProduct = async (id) => {
    try {
        let result = await Product.findOne({ _id: id })
            .populate('categories')
            .populate('feedbacks');
        return result;
    } catch (error) {
        return error;
    }
}

const cProduct = async (data) => {
    try {
        let result = await Product.create(data);
        return result;
    } catch (error) {
        return error;
    }
}

const uProduct = async (data) => {
    try {
        let result = await Product.updateOne({ _id: data._id }, { ...data });
        return result
    } catch (error) {
        return error;
    }
}

const dProduct = async (id) => {
    try {
        let result = await Product.deleteById(id);
        return result
    } catch (error) {
        return error;
    }
}

module.exports = {
    gProduct, cProduct, uProduct, dProduct, gProducts
}