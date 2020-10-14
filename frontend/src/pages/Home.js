import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
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
        <h3>Loading...</h3>
        // display error
      ) : error ? (
        <h5>{error}</h5>
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
