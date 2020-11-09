import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormWrapper from "../components/FormWrapper";
import { listProductInfo } from "../actions/products";


function ProductEdit({ match, history }) {
  //get product id
  const productId = match.params.id;
  //set initial state: name, update function
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  //get login from state
  const productInfo = useSelector((state) => state.productInfo);
  const { loading, error, product } = productInfo;

  useEffect(() => {
      if (!product.name || product._id !== productId) {
        dispatch(listProductInfo(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
  }, [ dispatch, history, product, productId, ]);

  //dispatch login
  const submitHandler = (e) => {
    e.preventDefault();
    //update
  };

  return (
    <div>
      <Link to="/admin/productlist" className="btn my-3">
        Go Back
      </Link>
      <FormWrapper>
        <h1>Edit Product</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name Here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price Here"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand Here"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Here"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
            <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description Here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="info">
              Update
            </Button>
          </Form>
        )}
      </FormWrapper>
    </div>
  );
}

export default ProductEdit;
