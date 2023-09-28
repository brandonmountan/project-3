import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../src/App.css';

const Signup = () => {
    return(
        <div className='signup-form'>
        <Form>
        <h2>Sign-up</h2>
    <Form.Group controlId="signupName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" />
    </Form.Group>
    <Form.Group controlId="signupEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group controlId="signupPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Sign Up
    </Button>
    </Form>
    </div>
    )
}

export default Signup;

