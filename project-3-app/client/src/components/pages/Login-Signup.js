import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../src/App.css'; // Import a CSS file for styling

function LoginSignup() {
  return (
    <div className="container">
      <div className="forms-container">
        {/* Sign-up Form */}
        <div className="form-left">
          <Form>
            <h2>Sign-up</h2>
            <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
           <Form.Group controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
            <Button variant="success" type="submit" className='sign-up'>
              Sign Up
            </Button>
          </Form>
        </div>

        {/* Login Form */}
        <div className="form-right">
          <Form>
            <h2>Login</h2>
            <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
            <Button variant="primary" type="submit" className='login'>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;