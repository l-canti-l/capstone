import express from "express";
import { getProducts, getProductById, deleteProductById, updateProduct, createProduct, createReview } from '../controllers/productController.js';
import { protection, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//get route for all products, /api/products
router.route("/").get(getProducts).post(protection, admin, createProduct)
//reviews
router.route("/:id/reviews").post(protection, createReview)

//get single product by id, /api/products/:id
router.route("/:id").get(getProductById).delete(protection, admin, deleteProductById).put(protection, admin, updateProduct)

export default router;
