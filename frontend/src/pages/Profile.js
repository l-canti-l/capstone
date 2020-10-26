import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../actions/types";

function Profile({ history }) {
  //set initial state: name, update function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  //get login from state
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  //redirect if logged in
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  //dispatch login
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch register function
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      if (window.confirm('Do you want to save changes?') == true)
      dispatch(updateUser({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col className="mx-3">
        <h1>Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="info">Updated Profile</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Name Here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="info">
            Update
          </Button>
        </Form>
      </Col>
      <Col>
        <h1 className="orders">Orders</h1>
      </Col>
    </Row>
  );
}

export default Profile;
