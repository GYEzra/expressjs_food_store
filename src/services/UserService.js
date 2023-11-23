const User = require('../models/User.js')
const aqp = require('api-query-params');

const gUser = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter, sort } = aqp(queryString);

            result = await User.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .exec();
        } else {
            result = await User.find({ role: 'Khách hàng' });
        }
        return result;
    } catch (error) {
        return error;
    }
}

const handleGetUser = async (_id) => {
    return await User.findOne({ _id });
}

const uUser = async (data) => {
    try {
        let result = await User.updateOne({ _id: data._id }, {
            ...data
        });
        return result
    } catch (error) {
        console.log(error)
        return error;
    }
}

const dUser = async (_id) => {
    try {
        let result = await User.deleteById(_id);
        return result
    } catch (error) {
        return error;
    }
}


module.exports = {
    gUser, uUser, dUser, handleGetUser
}