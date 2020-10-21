import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//get route for all products, /api/products
const getProducts = asyncHandler(async (request, response) => {
    const products = await Product.find({});

    response.json(products);
})

//get single product by id, /api/products/:id
const getProductById = asyncHandler(async (request, response) => {
    const product = await Product.findById(request.params.id);

    //check if product exists
    if (product) {
      response.json(product);
    } else {
      response.status(404);
      throw new Error("Product does not exist");
    }
})

export { getProducts, getProductById }