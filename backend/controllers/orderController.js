import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//create new order, POST to api/orders, private route
const addOrderItems = asyncHandler(async (request, response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = request.body;

  if (orderItems && orderItems.length === 0) {
    response.status(400);
    throw new Error("No items in order");
    return;
  } else {
    const order = new Order({
      user: request.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    response.status(201).json(createdOrder);
  }
});
//get an order by its ID, GET to api/orders/:id, private
const getOrderById = asyncHandler(async (request, response) => {
  //fetch order, and use populate to get name and email
  const order = await Order.findById(request.params.id).populate(
    "user",
    "name email"
  );
  //check for order and if an order exists respond with order
  if (order) {
    response.json(order);
  } else {
    response.status(404);
    throw new Error("Order not found");
  }
});

export { addOrderItems, getOrderById };
