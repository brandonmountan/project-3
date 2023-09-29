import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LOGIN } from '../utils/mutations';
import '../../../src/App.css';
import { Link } from 'react-router-dom';


import Auth from '../utils/auth';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { data }] = useMutation(LOGIN);

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
    console.log(data);
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
    <div className='forms-container'>
      <div className='login-form'>
        {/* Login Form */}
        <h2>Login</h2>
        {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/#profile">go to profile.</Link>
              </p>
            ) : (
        <form onSubmit={handleFormSubmit}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        </form>
            )}
      </div>
    </div>
    
  );
}

export default Login;