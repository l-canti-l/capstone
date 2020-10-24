import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormWrapper from "../components/FormWrapper";
import {login} from '../actions/userActions';

function Login({location, history}) {
  //set initial state: name, update function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  //get login from state
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  //redirect if logged in
  useEffect(() => {
      if(userInfo) {
          history.push(redirect)
      }
  }, [history, userInfo, redirect])

  //dispatch login
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormWrapper>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="info">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          ></Link>
        </Col>
      </Row>
    </FormWrapper>
  );
}

export default Login;
