const Category = require('../models/Category.js');
const Product = require('../models/Product.js');
const aqp = require('api-query-params');

const gCategory = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page || queryString) {
            let offset = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;

            result = await Category.find(filter).skip(offset).limit(limit).exec();
        } else {
            result = await Category.find({});
        }
        return result;
    } catch (error) {

        console.log(error)
        return error;
    }
}

const cCategory = async (data) => {
    console.log(data)
    try {
        const checkCategory = await Category.find({ name: data.name });
        if (checkCategory.length > 0) {
            return null;
        } else {
            return await Category.create(data);
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

const uCategory = async (data) => {
    try {
        const checkCategory = await Category.find({ name: data.name });
        if (checkCategory.length > 0) {
            return null;
        } else {
            const result = await Category.updateOne({ _id: data._id }, {
                name: data.name,
                description: data.description
            });
            return result;
        }
    } catch (error) {
        return error;
    }
}

const dCategory = async (id) => {
    try {
        let product = await Product.findOne({ categories: id });

        if (!product) {
            let result = await Category.deleteById(id);
            return {
                EC: 0,
                data: result
            }
        } else {
            return {
                EC: -1,
                errorMessage: 'Tồn tại sản phẩm trong danh mục'
            }
        }
    } catch (error) {
        return {
            EC: -1,
            errorMessage: 'Lỗi hệ thống'
        }
    }
}

module.exports = {
    gCategory, cCategory, uCategory, dCategory
}