import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LOGIN } from "../utils/mutations";
import "../../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Login = (props) => {
  // console.log("hello1");
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { data }] = useMutation(LOGIN);
  const navigate = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("hello2");

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      // console.log("hello3");
      Auth.login(data.login.token);

      navigate("/profile");
    } catch (e) {
      console.error(e);
    }
    console.log("hello4");

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <div className="forms-container">
      <div className="login-form">
        {/* Login Form */}
        <h2>Login</h2>
        {data ? (
          <p>
            Success! You may now head <Link to="/profile">go to profile.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={formState.email}
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formState.password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
