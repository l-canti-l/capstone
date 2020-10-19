import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  ListGroup,
  Card,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductInfo } from "../actions/products.js";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductInfo({ match, history }) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  //get product info from state
  const productInfo = useSelector((state) => state.productInfo);
  //take these variables from productInfo state
  const { loading, product, error } = productInfo;

  useEffect(() => {
    dispatch(listProductInfo(match.params.id));
  }, [dispatch, match]);
  //empty array is for dependencies that will change when fired

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <div>
          <Row className="justify-content-center my-3">
            <Image src={product.image} alt={product.name} />
          </Row>
          <Row className="justify-content-center">
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item variant="info" className="product-page-title no-effect">
                  <h5>
                    <u>{product.name}</u>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={` out of ${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col className="product-page-shop-left">Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col className="product-page-shop-left">Stock:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? `${product.countInStock} available`
                          : "Currently Unavailable"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                        
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {/* create array spread across countinstock */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block btn-info"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Snag It
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Link className="btn btn-info my-3" to="/">
                Back!
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
