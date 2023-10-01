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
