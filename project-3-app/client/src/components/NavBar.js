<<<<<<< HEAD
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Auth from "./utils/auth";

  function NavBar() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="#home">PostGame</Navbar.Brand>
              <Nav variant="underline" className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/gamepage">GamePage</Nav.Link>
                <Nav.Link href="/me">{Auth.getProfile().data.username}'s Profile</Nav.Link>
                <Nav.Link href="/" onClick={() => Auth.logout()}>Logout</Nav.Link>
=======
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Auth from './utils/auth';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleNavCollapse = () => {
    setExpanded(!expanded);
  };

  if (Auth.loggedIn()) {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" expanded={expanded}>
          <Container>
            {/* <Navbar.Brand href="#home">PostGame</Navbar.Brand> */}
            {/* <Link to="/home" className="navbar-brand">PostGame</Link> */}
            <Navbar.Toggle onClick={handleNavCollapse} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/home"
                  className={location.pathname === '/home' ? 'active' : ''}>Home</Nav.Link>
                <Nav.Link as={Link} to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ''}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/gamepage"
                  className={location.pathname === '/gamepage' ? 'active' : ''}>Gamepage</Nav.Link>
                <Nav.Link as={Link} to="/about"
                  className={location.pathname === '/about' ? 'active' : ''}>About</Nav.Link>
                <Nav.Link as={Link} to="/contact"
                  className={location.pathname === '/contact' ? 'active' : ''}>Contact</Nav.Link>



                <Nav.Link href="/"
                  className={location.pathname === '/logout' ? 'active' : ''}
                  onClick={() => Auth.logout()}>Logout</Nav.Link>
>>>>>>> ad406854c3613ebcfb31f9d5353c8123462c0770
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" expanded={expanded}>
          <Container>
            <Navbar.Brand href="#home">PostGame</Navbar.Brand>
            <Navbar.Toggle onClick={handleNavCollapse} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/home"
                  className={location.pathname === '/home' ? 'active' : ''}>Home</Nav.Link>
                <Nav.Link as={Link} to="/signup"
                  className={location.pathname === '/signup' ? 'active' : ''}>Signup</Nav.Link>
                <Nav.Link as={Link} to="/login"
                  className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
