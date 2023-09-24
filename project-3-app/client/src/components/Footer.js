import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import '../Footer.css';

function Footer() {
  return (
    <>
      <Navbar className="bg-body-tertiary" id="footer">
        <Container>
          <Navbar.Brand id="text">Website made with love by PostGame team.</Navbar.Brand>
        </Container>
      </Navbar>
</>
  );
}

export default Footer;
