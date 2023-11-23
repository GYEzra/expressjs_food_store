const { handleCreatePayment } = require('../services/PaymentService')

const createPayment = async (req, res) => {
    const result = await handleCreatePayment(req.body);
    console.log(result)

    return res.status(200).json(
        {
            EC: 0,
            message: "Tạo URL Thanh toán bằng Momo",
            data: result
        }
    )
}

module.exports = {
    createPayment
}