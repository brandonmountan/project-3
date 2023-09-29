import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import AuthService from '../utils/auth';
import '../../../src/App.css';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('LoginSignup'); // Add currentPage state

  const [login] = useMutation(LOGIN);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      const { token } = data.login;

      // Save the token to localStorage using your AuthService
      AuthService.login(token);

      // Redirect to the Profile page by updating the currentPage state
      setCurrentPage('Profile');
    } catch (error) {
      console.error(error);
      // Handle login error, e.g., show an error message to the user
    }
  };

  return (
    <div className='forms-container'>
      <div className='login-form'>
        {/* Login Form */}
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;