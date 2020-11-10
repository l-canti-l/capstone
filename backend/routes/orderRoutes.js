import express from "express";
import {
  addOrderItems, getOrderById, updateOrderToPaid, getUsersOrders, getOrders, updateOrderToDelivered
} from "../controllers/orderController.js";
import { protection, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(protection, addOrderItems).get(protection, admin, getOrders)
router.route('/myorders').get(protection, getUsersOrders)
router.route('/:id').get(protection, getOrderById)
router.route('/:id/delivered').put(protection, admin, updateOrderToDelivered)
router.route('/:id/paid').put(protection, updateOrderToPaid)


export default router;
