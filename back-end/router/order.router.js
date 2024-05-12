const { Router } = require('express');
const { auth } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { createOrder, acceptOrder, rejectOrder, getOrdersList } = require('../controller/order.controller');

const orderRouter = Router();

orderRouter.post('/', auth, createOrder);
orderRouter.post('/:orderId/accept', auth, adminMiddleware, acceptOrder);
orderRouter.post('/:orderId/reject', auth, adminMiddleware, rejectOrder);
orderRouter.get('/', auth, getOrdersList);

module.exports = {
  orderRouter,
};