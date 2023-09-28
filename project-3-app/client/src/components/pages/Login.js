import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };


  return (
    <div className="m-5">
      {data ? (
        <p>success</p>
      ) : (
        <Form className="p-5">
        {/* Login Form */}
        <h2>Login</h2>
        <Form.Group onSubmit={handleFormSubmit} controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formState.email}
            type="email"
            placeholder="Enter email"
            />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={formState.password} onChange={handleChange} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      )}
      {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
    </div>
  );
}

export default Login;