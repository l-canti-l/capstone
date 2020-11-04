import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAID_RESET } from "../actions/types";

function Order({ match }) {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  //set state for when SDK is ready to go
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPaid = useSelector((state) => state.orderPaid);
  //rename success and loading because already used
  const { success: successPay, loading: loadingPay } = orderPaid;

  if (!loading) {
    const decimals = (number) => {
      return (Math.round(number * 100) / 100).toFixed(2);
    };
    //calculate all prices
    order.itemsPrice = decimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    order.shippingPrice = decimals(order.itemsPrice > 100 ? 0 : 5);
    order.taxPrice = decimals(Number((0.0625 * order.itemsPrice).toFixed(2)));
    order.totalPrice = decimals(
      (
        Number(order.itemsPrice) +
        Number(order.shippingPrice) +
        Number(order.taxPrice)
      ).toFixed(2)
    );
  }
  //check if order exists or that the _id matches URL id, if not GET most recent order
  useEffect(() => {
    //build paypal script when page loads
    const addPayPalSDK = async () => {
      //fetch id
      const { data: clientId } = await axios.get("/api/config/paypal");
      //create script
      const script = document.createElement("script");
      //add type
      script.type = "text/javascript";
      //set source
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      //once the script loads call the state modifier fuction for sdk ready
      script.onload = () => {
        setSdkReady(true);
      };
      //add script to body
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      //prevent refresh loop
      dispatch({ type: ORDER_PAID_RESET });
      dispatch(getOrderDetails(orderId));
      //else if the order is not paid
    } else if (!order.isPaid) {
      //check to see is script is there
      if (!window.paypal) {
        addPayPalSDK();
        //if its there change state to ready
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successfulPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h3>Order: {order._id}</h3>
      <Row>
        <Col md={7} sm={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                <u>Shipping</u>
              </h3>
              <span>
                <strong>Name:</strong> {order.user.name}
              </span>
              <br />
              <span>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </span>
              <br />
              <span>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </span>
              <span>
                {order.isDelivered ? (
                  <Message variant="info">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </span>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>
                <u>Payment</u>
              </h3>
              <span>
                <strong>Method: </strong>
                {order.paymentMethod}
              </span>
              <span>
                {order.isPaid ? (
                  <Message variant="info">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </span>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>
                <u>Items in Cart</u>
              </h3>
              {order.orderItems.length === 0 ? (
                <Message>No Orders</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <Row className="my-3" key={item._id}>
                      <Col md={2} sm={2}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4} sm={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5} sm={5}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>
                  <u>Order Summary</u>
                </h5>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* if not paid */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {/* check loading */}
                  {loadingPay && <Loader />}
                  {/* check script ready */}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successfulPaymentHandler}
                      style={{ color: "blue" }}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
