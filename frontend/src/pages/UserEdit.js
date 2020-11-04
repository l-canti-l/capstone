import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormWrapper from "../components/FormWrapper";
import { getDetails, adminUpdateUser } from "../actions/userActions";
import {ADMIN_USER_UPDATE_RESET } from "../actions/types";

function UserEdit({ match, history }) {
  //get user id
  const userId = match.params.id;
  //set initial state: name, update function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  //get login from state
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const adminUserUpdate = useSelector((state) => state.adminUserUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUserUpdate;

  //redirect if logged in
  useEffect(() => {
    //check for update success
    if (successUpdate) {
      dispatch({ type: ADMIN_USER_UPDATE_RESET })
      history.push('/admin/userlist');
    } else {
      //if user doesnt exist or match url
      if (!user.name || user._id !== userId) {
        dispatch(getDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, successUpdate, history]);

  //dispatch login
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUser({_id: userId, name, email, isAdmin}))
  };

  return (
    <div>
      <Link to="/admin/userlist" className="btn my-3">
        Go Back
      </Link>
      <FormWrapper>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="info">
              Update
            </Button>
          </Form>
        )}
      </FormWrapper>
    </div>
  );
}

export default UserEdit;
