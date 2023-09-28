import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

// import { LOGIN } from '../utils/mutations';
import '../../../src/App.css';


const Login = (props) => {

  return (

    <div className="m-5">
      {data ? (
        <p>success</p>
      ) : (
        <Form className="p-5">
    <div className='forms-container'>
      <div className='login-form'>
        {/* Login Form */}
        <h2>Login</h2>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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
    </div>
    
  );
}

export default Login;