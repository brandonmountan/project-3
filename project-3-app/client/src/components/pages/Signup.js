import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../src/App.css';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

    return(
        <div className='forms-container'>
        <div className='signup-form'>
        <Form onSubmit={handleSubmit}>
        <h2>Sign-up</h2>
    <Form.Group controlId="signupName">
      <Form.Label>username</Form.Label>
      <Form.Control type="text" placeholder="Enter name" onChange={handleChange} />
    </Form.Group>
    <Form.Group controlId="signupEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
    </Form.Group>
    <Form.Group controlId="signupPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={handleChange} />
    </Form.Group>
    <Button variant="success" type="submit">
      Sign Up
    </Button>
    </Form>
    </div>
    </div>
    )
}

export default Signup;

