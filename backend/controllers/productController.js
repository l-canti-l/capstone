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

//create new review, POST to /api/products/:id/review private
const createReview = asyncHandler(async (request, response) => {
  //get details from request body
  const { rating, comment } = request.body;
  //find product
  const product = await Product.findById(request.params.id);

  if (product) {
    //check to see if user already submitted review, logged user vs current user
    const reviewed = product.reviews.find(
      (rev) => rev.user.toString() === request.user._id.toString()
    );
    if (reviewed) {
      response.status(400);
      throw new Error("Youve already given your input");
    }
    //if no review
    const review = {
      name: request.user.name,
      rating: Number(rating),
      comment,
      user: request.user._id,
    };
    //add review
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    //overall rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    //save review to product
    await product.save();
    response.status(201).json({ message: "Review has been added" });
  } else {
    response.status(404);
    throw new Error("No such product");
  }
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createReview
};
