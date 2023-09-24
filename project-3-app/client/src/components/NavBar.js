import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavBar({ currentPage, handlePageChange }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
         <Container>
         <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={() => handlePageChange('Home')}>Home</Nav.Link>
            <Nav.Link href="#about" onClick={() => handlePageChange('About')}>Profile</Nav.Link>
            <Nav.Link href="#contact" onClick={() => handlePageChange('Contact')}>Login In/Signup</Nav.Link>
            <Nav.Link href="#resume" onClick={() => handlePageChange('Resume')}>Post</Nav.Link>
            <Nav.Link href="#portfolio" onClick={() => handlePageChange('Portfolio')}>GamePage</Nav.Link>
          </Nav>
         </Container>
    </Navbar>
  );
}

export default NavBar;
