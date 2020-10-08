import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Card className="my-3 p-3 product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">{product.name}</Card.Title>
        </Link>
        <Card.Text as="div">
           <Rating value={product.rating} text={` out of ${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h5" className="price">
            {product.price}
        </Card.Text>

      </Card.Body>
    </Card>
  );
}

export default Product;
