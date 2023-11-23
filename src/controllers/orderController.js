const { getAll, get, update, remove, create } = require('../services/OrderService.js')

const getAllOrder = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;

    if (limit && page || req.query) {
        result = await getAll(limit, page, req.query);
    } else {
        result = await getAll();
    }

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const getOrder = async (req, res) => {
    let _id = req.params.id;
    let result = await get(_id);
    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const createOrder = async (req, res) => {
    let result = await create(req.body);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const updateOrder = async (req, res) => {
    let result = await update(req.body);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const deleteOrder = async (req, res) => {
    let result = await remove(req.body.id);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

module.exports = { getAllOrder, createOrder, updateOrder, deleteOrder, getOrder }