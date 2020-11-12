import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { listTopProducts } from "../actions/products";
import Message from "./Message";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";

function TopProducts() {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products } = topProducts;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause='hover'>
        {products.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h4>{product.name} (${product.price})</h4>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  );
}
export default TopProducts;
