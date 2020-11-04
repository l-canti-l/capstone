import express from "express";
import {
  addOrderItems, getOrderById, updateOrderToPaid, getUsersOrders
} from "../controllers/orderController.js";
import { protection } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(protection, addOrderItems)
router.route('/myorders').get(protection, getUsersOrders)
router.route('/:id').get(protection, getOrderById)
router.route('/:id/paid').put(protection, updateOrderToPaid)


export default router;
