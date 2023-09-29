// import React from "react";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Auth from "../../utils/auth";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
// function NavBar() {
//   if (Auth.loggedin()) {}
//   return (
//     <Navbar className="justify-content-center " bg="dark" data-bs-theme="dark">
//       <Nav>
//         <Nav.Link href="#home" onClick={() => }>
//           Home
//         </Nav.Link>
//         <Nav.Link href="#profile" onClick={() => handlePageChange("Profile")}>
//           Profile
//         </Nav.Link>
//         <Nav.Link href="#login" onClick={() => handlePageChange("Login")}>
//           Login
//         </Nav.Link>
//         <Nav.Link href="#signup" onClick={() => handlePageChange("Signup")}>
//           Signup
//         </Nav.Link>
//         <Nav.Link href="#post" onClick={() => handlePageChange("ProfilePost")}>
//           Post
//         </Nav.Link>
//         <Nav.Link href="#gamePage" onClick={() => handlePageChange("GamePage")}>
//           GamePage
//         </Nav.Link>
//         <Nav.Link href="#contact" onClick={() => handlePageChange("Contact")}>
//           Contact
//         </Nav.Link>
//       </Nav>
//     </Navbar>
//   );
// }

// export default NavBar;

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
            <Navbar.Brand href="#home">PostGame</Navbar.Brand>
            <Navbar.Toggle onClick={handleNavCollapse} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/home"
                  className={location.pathname === '/home' ? 'active' : ''}>Home</Nav.Link>
                <Nav.Link as={Link} to="/about"
                  className={location.pathname === '/about' ? 'active' : ''}>About</Nav.Link>
                <Nav.Link as={Link} to="/contact"
                  className={location.pathname === '/contact' ? 'active' : ''}>Contact</Nav.Link>
                <Nav.Link as={Link} to="/gamepage"
                  className={location.pathname === '/gamepage' ? 'active' : ''}>Gamepage</Nav.Link>
                <Nav.Link as={Link} to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ''}>Profile</Nav.Link>

                <Nav.Link href="/"
                  className={location.pathname === '/logout' ? 'active' : ''}
                  onClick={() => Auth.logout()}>Logout</Nav.Link>
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
