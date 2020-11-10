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
//update order to indicate a payment, GET api/orders/:id/paid
const updateOrderToPaid = asyncHandler(async (request, response) => {
  //fetch order, and use populate to get name and email
  const order = await Order.findById(request.params.id);
  //check for order and if an order exists respond with order
  if (order) {
    order.isPaid = true,
    order.paidAt = Date.now(),
    order.paymentResult = {
        id: request.body.id,
        status: request.body.status,
        update_time: request.body.update_time,
        email_address: request.body.payer.email_address,
      }
    const updatedOrder = await order.save();
    response.json(updatedOrder)
  } else {
    response.status(404);
    throw new Error("Order not found");
  }
});

//update order to indicate a out for delivery, PUT api/orders/:id/delivered, private/admin
const updateOrderToDelivered= asyncHandler(async (request, response) => {
  //fetch order, and use populate to get name and email
  const order = await Order.findById(request.params.id);
  //check for order and if an order exists respond with order
  if (order) {
    order.isDelivered = true,
    order.deliveredAt = Date.now()
    
    const updatedOrder = await order.save();
    response.json(updatedOrder)
  } else {
    response.status(404);
    throw new Error("Order not found");
  }
});

//get orders of logged in user, GET api/orders/myorders, private
const getUsersOrders = asyncHandler(async (request, response) => {
  //fetch orders of logged in user
  const orders = await Order.find({ user: request.user._id});
  response.json(orders)
});

//get orders all orders for admin, GET api/orders, private, admin
const getOrders = asyncHandler(async (request, response) => {
  const orders = await Order.find({}).populate('user', 'id name');
  response.json(orders)
});

export { addOrderItems, getOrderById, updateOrderToPaid, getUsersOrders, getOrders, updateOrderToDelivered };
