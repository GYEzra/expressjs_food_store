const { query } = require('express');
const { gCategory, cCategory, dCategory, uCategory } = require('../services/CategoryService')

const getAllCategory = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;

    if (limit && page || req.query) {
        result = await gCategory(limit, page, req.query);
    } else {
        result = await gCategory();
    }

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const createCategory = async (req, res) => {
    let result = await cCategory(req.body);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const updateCategory = async (req, res) => {
    let result = await uCategory(req.body);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const deleteCategory = async (req, res) => {
    let result = await dCategory(req.params.id);

    return res.status(200).json(
        { ...result }
    )
}

module.exports = {
    getAllCategory, createCategory, updateCategory, deleteCategory
}