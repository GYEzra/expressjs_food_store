const express = require('express')
const routerAPI = express.Router()
const { login, handleRefreshToken, logout, resgiter } = require('../controllers/authController');
const { updateUser, deleteUser, getAllUser, getUser } = require('../controllers/userController');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/productController');
const { getAllOrder, createOrder, updateOrder, deleteOrder, getOrder } = require('../controllers/orderController');
const { getAllCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/catetoryController');
const { checkUserJWT } = require('../middleware/JWTAction');
const { getAllFeedback, createFeedback, updateFeedback, deleteFeedback, getFeedback } = require('../controllers/feedbackController');
const { getAllVoucher, createVoucher, updateVoucher, deleteVoucher, getVoucher } = require('../controllers/voucherController');
const { createPayment } = require('../controllers/paymentController');



routerAPI.post('/login', login)
routerAPI.get('/refreshToken', handleRefreshToken)
routerAPI.get('/logout', logout)
routerAPI.post('/users', resgiter)

routerAPI.get('/users', getAllUser)
routerAPI.put('/users', updateUser)
routerAPI.get('/users/:id', getUser)
routerAPI.delete('/users/:id', deleteUser)

routerAPI.get('/products', getAllProduct)
routerAPI.get('/products/:id', getProduct)
routerAPI.post('/products', createProduct)
routerAPI.put('/products', updateProduct)
routerAPI.delete('/products/:id', deleteProduct)

routerAPI.get('/orders', getAllOrder)
routerAPI.get('/orders/:id', getOrder)
routerAPI.post('/orders', createOrder)
routerAPI.put('/orders', updateOrder)
routerAPI.delete('/orders', deleteOrder)

routerAPI.get('/categories', getAllCategory)
routerAPI.post('/categories', createCategory)
routerAPI.put('/categories', updateCategory)
routerAPI.delete('/categories/:id', deleteCategory)

routerAPI.get('/feedbacks', getAllFeedback)
routerAPI.get('/feedbacks/:id', getFeedback)
routerAPI.post('/feedbacks', createFeedback)
routerAPI.put('/feedbacks', updateFeedback)
routerAPI.delete('/feedbacks/:id', deleteFeedback)

routerAPI.get('/vouchers', getAllVoucher)
routerAPI.get('/vouchers/:id', getVoucher)
routerAPI.post('/vouchers', createVoucher)
routerAPI.put('/vouchers', updateVoucher)
routerAPI.delete('/vouchers/:id', deleteVoucher)

routerAPI.post('/payments/create', createPayment)



module.exports = routerAPI