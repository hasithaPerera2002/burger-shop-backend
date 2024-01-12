import Order from "../models/order.js";
import asyncErrorHandler from "../util/asyncErrorHandler.js";

const addOrder = asyncErrorHandler(async (req, res, next) => {
  const order = new Order({
    user: req.body.userId,
    burger: req.body.burger,
    price: req.body.price,
    status: req.body.status,
    date: Date.now(),
  });
  await order.save().then((order) => {
    res.status(200).json({ order });
  });
});

const updateOrder = asyncErrorHandler(async (req, res, next) => {
  Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status,
      },
    }
  ).then((order) => {
    res.status(200).json({ order });
  });
});

const getOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find().populate("burger.burger");
  res.status(200).json({ orders });
});

export { addOrder, updateOrder, getOrders };
