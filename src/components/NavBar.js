import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/schedulize_logo.jpg";
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
          Schedulize
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i>Log in
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i>Try it out for free!
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
