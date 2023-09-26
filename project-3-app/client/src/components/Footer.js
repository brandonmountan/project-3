import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../Footer.css";

function Footer() {
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-center" id="footer">
        <Navbar.Brand id="text">
          Website made with love by PostGame team.
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Footer;
