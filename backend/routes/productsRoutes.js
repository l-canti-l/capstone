import express from "express";
import { getProducts, getProductById } from '../controllers/productController.js'


const router = express.Router();

//get route for all products, /api/products
router.route("/").get(getProducts)

//get single product by id, /api/products/:id
router.route("/:id").get(getProductById)

export default router;
