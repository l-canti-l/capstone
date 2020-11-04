import express from "express";
import {
  addOrderItems, getOrderById
} from "../controllers/orderController.js";
import { protection } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(protection, addOrderItems)
router.route('/:id').get(protection, getOrderById)

export default router;
