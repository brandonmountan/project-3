import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavBar({ currentPage, handlePageChange }) {
  return (
    <Navbar className="justify-content-center " bg="dark" data-bs-theme="dark">
      <Nav>
        <Nav.Link href="#home" onClick={() => handlePageChange("Home")}>
          Home
        </Nav.Link>
        <Nav.Link href="#profile" onClick={() => handlePageChange("Profile")}>
          Profile
        </Nav.Link>
        <Nav.Link href="#login-Signup" onClick={() => handlePageChange("Login-Signup")}>
          Login/Signup
        </Nav.Link>
        <Nav.Link href="#post" onClick={() => handlePageChange("Profile-Post")}>
          Post
        </Nav.Link>
        <Nav.Link
          href="#gamePage"
          onClick={() => handlePageChange("Portfolio")}
        >
          GamePage
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
