const { query } = require('express');
const { gUser, cUser, uUser, dUser, handleGetUser } = require('../services/UserService')

const getAllUser = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;

    if (limit && page) {
        result = await gUser(limit, page, req.query);
    } else {
        result = await gUser();
    }

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const getUser = async (res, req) => {
    let _id = req.params._id;
    const user = await handleGetUser(_id);

    return res.status(200).json(
        {
            EC: 0,
            data: user
        }
    )
}

const updateUser = async (req, res) => {
    let result = await uUser(req.body);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const deleteUser = async (req, res) => {
    const _id = req.params.id;
    let result = await dUser(_id);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

module.exports = {
    updateUser, deleteUser, getAllUser, getUser
}