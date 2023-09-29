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
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/gamepage">GamePage</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/" onClick={() => Auth.logout()}>Logout</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
    } else {
      return (
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href="signup">Signup</Nav.Link>
                <Nav.Link href="login">Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
    }
  }

export default NavBar;
