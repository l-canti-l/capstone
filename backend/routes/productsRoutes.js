import express from "express";
import { getProducts, getProductById, deleteProductById } from '../controllers/productController.js';
import { protection, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//get route for all products, /api/products
router.route("/").get(getProducts)

//get single product by id, /api/products/:id
router.route("/:id").get(getProductById).delete(protection, admin, deleteProductById)

export default router;
