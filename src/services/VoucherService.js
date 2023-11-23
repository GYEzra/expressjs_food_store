const Voucher = require('../models/Voucher.js')
const Order = require('../models/Order.js')
const aqp = require('api-query-params');

const gVouchers = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page || queryString) {
            let offset = (page - 1) * limit;
            const { filter, sort } = aqp(queryString);
            delete filter.page;
            console.log(sort)
            console.log(filter)

            result = await Voucher.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .exec();
        } else {
            result = await Voucher.find({});
        }
        return result;
    } catch (error) {
        return error;
    }
}

const gVoucher = async (id) => {
    try {
        let result = await Voucher.findOne({ _id: id });
        return result;
    } catch (error) {
        return error;
    }
}

const cVoucher = async (data) => {
    try {
        let voucher = await Voucher.findOne({ code: data.code });
        let errorMessage = null;

        if (data.type === "CREATE-VOUCHER") {
            if (!voucher) {
                let result = await Voucher.create(data);
                return {
                    EC: 0,
                    data: result
                }
            } else {
                errorMessage = 'Mã khuyến mãi đã tồn tại';
            }
        }

        if (data.type === "APPLY-VOUCHER") {
            if (voucher) {
                let expiredTime = voucher.expired_date.getTime();
                let currentTime = new Date().getTime();

                if (voucher.status === 'Còn hiệu lực' && voucher.quantity > 0 && expiredTime >= currentTime) {
                    let order = await Order.findOne({ userId: data.userId, voucher: voucher._id });

                    if (!order) {
                        return {
                            EC: 0,
                            data: voucher
                        }
                    } else {
                        errorMessage = 'Mã khuyến mãi đã được sử dụng'
                    }

                } else {
                    if (!(voucher.status === 'Còn hiệu lực'))
                        errorMessage = 'Mã khuyến mãi đã hết hạn';
                    else if (expiredTime < currentTime)
                        errorMessage = 'Mã khuyến mãi đã hết hạn';
                    else if (voucher.quantity <= 0)
                        errorMessage = 'Số lượng khuyến mãi đã hết';
                }
            } else {
                errorMessage = 'Mã khuyến mãi không hợp lệ';
            }
        }

        return {
            EC: -1,
            errorMessage
        }

    } catch (error) {
        return {
            EC: -1,
            errorMessage: 'Lỗi hệ thống'
        };
    }
}

const uVoucher = async (data) => {
    try {
        let result = await Voucher.updateOne({ _id: data._id }, { ...data });

        if (result.modifiedCount > 0) {
            return {
                EC: 0,
                message: 'Cập nhật thành công'
            }
        } else {
            return {
                EC: -1,
                errorMessage: 'Cập nhật thất bại'
            }
        }

    } catch (error) {
        return {
            EC: 0,
            errorMessage: 'Lỗi hệ thống'
        }
    }
}

const dVoucher = async (id) => {
    try {
        let result = await Voucher.deleteById(id);
        return result
    } catch (error) {
        return error;
    }
}

module.exports = {
    gVoucher, cVoucher, uVoucher, dVoucher, gVouchers
}