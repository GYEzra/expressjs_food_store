const Order = require('../models/Order.js');
const aqp = require('api-query-params');
const { uProduct } = require('../services/ProductService.js');
const { gVoucher, uVoucher } = require('../services/VoucherService.js');
const { isValidObjectId } = require('mongoose');

const getAll = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page || queryString) {
            let offset = (page - 1) * limit;
            const { filter, sort } = aqp(queryString);
            delete filter.page;

            result = await Order.find(filter)
                .skip(offset)
                .limit(limit)
                .populate(['userId', 'cart.product', 'voucher'])
                .sort(sort)
                .exec();
            console.log(result)
        } else {
            result = await Order.find({}).populate(['userId', 'cart.product', 'voucher']);
        }
        return result;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const get = async (_id) => {
    if (isValidObjectId(_id)) {
        return await Order.findOne({ _id }).populate(['userId', 'cart.product', 'voucher']);
    }
    return null;
}

const create = async (data) => {
    let result = null;
    try {
        let order = await Order.create({ ...data });

        if (order) {
            processQuantityStock(data.cart);

            if (data.voucher) {
                let voucher = await gVoucher(data.voucher);

                let dataUpdated = {
                    _id: data.voucher,
                    quantity: voucher.quantity - 1
                }

                await uVoucher(dataUpdated);
            }

            result = order;
        }

    } catch (error) {
        console.log(error);
    }

    return result;
}

const update = async (data) => {
    try {
        return await Order.updateOne({ _id: data._id }, { ...data });
    } catch (error) {
        return null;
    }
}

const remove = async (id) => {
    try {
        let result = await Order.deleteById(id);
        return result
    } catch (error) {
        return null;
    }
}

const processQuantityStock = async (cart) => {
    for (let i = 0; i < cart.length; i++) {
        let cartItem = cart[i];
        cartItem.product.quantity -= cartItem.quantity;
        await uProduct(cartItem.product);
    }
}
module.exports = {
    getAll, get, update, remove, create
}