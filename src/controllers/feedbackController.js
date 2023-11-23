const Feedback = require('../models/Feedback.js')
const { gFeedback, cFeedback, uFeedback, dFeedback, gFeedbacks } = require('../services/FeedbackService.js')


const getAllFeedback = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;

    if (limit && page || req.query) {
        result = await gFeedbacks(limit, page, req.query);
    } else {
        result = await gFeedbacks();
    }
    console.log(result);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const getFeedback = async (req, res) => {
    const id = req.params.id;

    let result = await gFeedback(id);
    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const createFeedback = async (req, res) => {

    let result = await cFeedback(req.body);
    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const updateFeedback = async (req, res) => {
    let result = await uFeedback(req.body);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const deleteFeedback = async (req, res) => {
    let result = await dFeedback(req.params.id);

    console.log(result)

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}


module.exports = {
    getAllFeedback, createFeedback, updateFeedback, deleteFeedback, getFeedback
}