const { Order } = require("../schema/order.schema");

const createOrder = async (req, res) => {
  const order = req.body;
  
  const newOrder = new Order({
    ...order,
    userId: req.user.id,
    status: 'pending',
  });

  await newOrder.save();

  res.status(201).json({ msg: 'Order created successfully' });
}

const acceptOrder = async (req, res) => {
  const { orderId } = req.params;

  await Order.findByIdAndUpdate(orderId, { status: 'accepted' });

  res.status(200).json({ msg: 'Order accepted' });
}

const rejectOrder = async (req, res) => {
  const { orderId } = req.params;

  await Order.findByIdAndUpdate(orderId, { status: 'rejected' });

  res.status(200).json({ msg: 'Order rejected' });
}

const getOrdersList = async (req, res) => {
  const user = req.user;

  const criteria = {};

  if (user.role != 'Admin') criteria.userId = user.id;

  const orders = await Order.find(criteria)
    .populate('cover.templateId')
    .populate('cover.id')
    .populate('templates.paperId')
    .populate('templates.templateId');

  res.status(200).json({ orders });
}

module.exports = {
  createOrder,
  acceptOrder,
  rejectOrder,
  getOrdersList,
}