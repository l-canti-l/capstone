import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


const router = express.Router();

//get route for all products, /api/products
router.get('/', asyncHandler(async(request, response) => {
    const products = await Product.find({})

    response.json(products)
}));

//get single product by id, /api/products/:id
router.get('/:id', asyncHandler(async(request, response) => {
    const product = await Product.findById(request.params.id)
    
    //check if product exists
    if(product) {
    response.json(product)
    } else {
        response.status(404).json({ message: 'Product not found' })
    }
}));

export default router;