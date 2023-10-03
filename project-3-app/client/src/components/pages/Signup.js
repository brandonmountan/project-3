import "../../App.css";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);

      // navigate to redirect to the profile page
      navigate("/profile");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="forms-container">
      <div className="signup-form">
        <Form onSubmit={handleFormSubmit}>
          <h2>Sign-up</h2>
          <Form.Group controlId="signupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter name"
              value={formState.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="signupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formState.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Sign Up
          </Button>
          {error && <p className="error-message">{error.message}</p>}
        </Form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
