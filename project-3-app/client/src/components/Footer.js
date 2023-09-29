import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../Footer.css";

function Footer() {
  return (
    <Navbar className="text-center" id="footer">
      <Container>
      <Navbar.Brand className="text-center" id="text">Website made with love by PostGame team.</Navbar.Brand>

      </Container>
    </Navbar>
  );
}

export default Footer;
