import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 product-card">
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </a>

      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">{product.name}</Card.Title>
        </a>
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
