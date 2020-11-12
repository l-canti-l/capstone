import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Pages from "../components/Pages";
import Loader from '../components/Loader';
import Message from '../components/Message';
import TopProducts from '../components/TopProducts';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/products";

function Home({ match }) {
  //get search term
  const searchTerm = match.params.searchTerm
  //get page number
  const pageNumber = match.params.pageNumber || 1
  //define dispatch variable
  const dispatch = useDispatch();
  //get state
  const productList = useSelector((state) => state.productList);
  //grab pieces of state from reducer
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(searchTerm, pageNumber));
  }, [dispatch, searchTerm, pageNumber]);

  return (
    <div>
      {!searchTerm && <TopProducts />}
      <h2>Latest Work</h2>
      {/* check if loading */}
      {loading ? (
        <Loader />
        // display error
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
        {/* display products */}
        <Row>
          {products.map((product) => (
            <Col key={product._id} className="product-container" sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Pages pages={pages} page={page} searchTerm={searchTerm ? searchTerm : ''}></Pages>
        </div>
      )}
    </div>
  );
}

export default Home;
