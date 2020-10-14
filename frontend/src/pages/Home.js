import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/products";

function Home() {
  //define dispatch variable
  const dispatch = useDispatch();
  //get state
  const productList = useSelector((state) => state.productList);
  //grab pieces of state from reducer
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Latest Work</h2>
      {/* check if loading */}
      {loading ? (
        <Loader />
        // display error
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        // display products
        <Row>
          {products.map((product) => (
            <Col key={product._id} className="product-container">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
