import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
          <Container>
        <Navbar.Brand href="/">CorpseLyf_Art</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/shopping-cart"><i className="fas fa-skull-crossbones"></i> Yr Cart</Nav.Link>
            <Nav.Link href="login"><i class="fas fa-dungeon"></i> Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
