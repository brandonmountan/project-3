import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../Footer.css";
import { Container } from "react-bootstrap";

function Footer() {
  // return null;
  return (
    <Navbar className="text-center" id="footer">
      <Navbar.Brand className="text-center" id="text">
        Website made with love by PostGame team.
      </Navbar.Brand>
    </Navbar>
  );
}

export default Footer;
