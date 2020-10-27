import express from "express";
import {
  addOrderItems
} from "../controllers/orderController.js";
import { protection } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(protection, addOrderItems)

export default router;
