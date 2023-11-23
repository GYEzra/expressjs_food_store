const Voucher = require('../models/Voucher.js')
const { gVoucher, cVoucher, uVoucher, dVoucher, gVouchers } = require('../services/VoucherService.js')


const getAllVoucher = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;

    if (limit && page || req.query) {
        result = await gVouchers(limit, page, req.query);
    } else {
        result = await gVouchers();
    }

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const getVoucher = async (req, res) => {
    const id = req.params.id;

    let result = await gVoucher(id);
    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const createVoucher = async (req, res) => {

    let result = await cVoucher(req.body);
    return res.status(200).json(
        {
            ...result
        }
    )
}

const updateVoucher = async (req, res) => {
    let result = await uVoucher(req.body);

    return res.status(200).json(
        {
            ...result
        }
    )
}

const deleteVoucher = async (req, res) => {
    let result = await dVoucher(req.params.id);

    console.log(result)

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}


module.exports = {
    getAllVoucher, createVoucher, updateVoucher, deleteVoucher, getVoucher
}