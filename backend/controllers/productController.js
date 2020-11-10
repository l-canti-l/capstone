import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//get route for all products, /api/products
const getProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({});

  response.json(products);
});

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
});
//delete product by id, DELETE /api/products/:id private/ADMIN
const deleteProductById = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);

  //check if product exists
  if (product) {
    await product.remove();
    response.json({ message: "That shit sucked anyway" });
  } else {
    response.status(404);
    throw new Error("Product does not exist");
  }
});

//create product, POST to /api/products private/ADMIN
const createProduct = asyncHandler(async (request, response) => {
  //declare new product with sample data
  const product = new Product({
    name: "New Product",
    price: 0,
    user: request.user._id,
    image: "/images/sample.bmp",
    brand: "",
    category: "",
    countInStock: 0,
    numReviews: 0,
    description: "",
  });
  //save product
  const createdProduct = await product.save();
  response.status(201).json(createdProduct);
});

//update product, PUT to /api/products/:id private/ADMIN
const updateProduct = asyncHandler(async (request, response) => {
  //get details from request body
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = request.body;

  const product = await Product.findById(request.params.id);

  if (product) {
    //set details to info from  body
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    //save
    const updatedProduct = await product.save();
    response.status(201).json(updatedProduct);
  } else {
    response.status(404);
    throw new Error("No such product");
  }
});

export { getProducts, getProductById, deleteProductById, createProduct, updateProduct };
