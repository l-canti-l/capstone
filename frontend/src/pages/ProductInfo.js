import React from "react";
import products from "../products";
import { Link } from "react-router-dom";
import { Image, ListGroup, Card, Row, Col, Button } from "react-bootstrap";
import Rating from "../components/Rating";

function ProductInfo({ match }) {
  const product = products.find((prod) => prod._id === match.params.id);
  return (
    <div>
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item variant="info" className="product-page-title">
              <h5><u>{product.name}</u></h5>
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

              <ListGroup.Item>
                <Button
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
  );
}

export default ProductInfo;
