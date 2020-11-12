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
import { listProductInfo, createReview } from "../actions/products.js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types";

function ProductInfo({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  //get product info from state
  const productInfo = useSelector((state) => state.productInfo);
  //take these variables from productInfo state
  const { loading, product, error } = productInfo;

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { success: reviewSuccess, error: reviewError } = reviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (reviewSuccess) {
      alert("Your feedback has been submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductInfo(match.params.id));
  }, [dispatch, match, reviewSuccess]);
  //empty array is for dependencies that will change when fired

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
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
                <ListGroup.Item variant="info" className="product-page-title">
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
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Stock:</Col>
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
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <h5>Reviews</h5>
              {product.reviews.length === 0 && (
                <Message variant="warning">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{review.createdAt.substring(0, 10)}</span>
                    <br />
                    <span>{review.comment}</span>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5>Leave some feedback</h5>
                  {reviewError && (
                    <Message variant="danger">{reviewError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">Shitty(1)</option>
                          <option value="2">Alright(2)</option>
                          <option value="3">Mad Decent(3)</option>
                          <option value="4">Great(4)</option>
                          <option value="5">Phenomenal(5)</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="6"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit!
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">log in</Link> to leave your
                      feedback
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
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
