import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct, createProduct } from "../actions/products";
import { PRODUCT_CREATE_RESET } from '../actions/types';

function ProductList({ history, match }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  
  const productDelete = useSelector((state) => state.productDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;
  
  const productCreate = useSelector((state) => state.productCreate);
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    //is admin?
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } 
    if(successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct())
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h3>Products</h3>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="info" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-skull-crossbones"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className='justify-content-center'>
            <Button className="my-3" variant='info' onClick={createProductHandler}>
            <i className="fas fa-burn"></i> Create Product
            </Button>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductList;
