import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import ModalComponent from '../Modal/Modal';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Brand</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavItem>
            <Link to="/" className="nav-link">Home</Link>
          </NavItem>
          <NavItem>
            <ModalComponent text="Signup" variant="primary" isSignupFlow={true} />
          </NavItem>
          <NavItem>
            <ModalComponent text="Login" variant="danger" isSignupFlow={false} />
          </NavItem>
          {localStorage.getItem("token") && (
            <NavItem>
              <Link to="/" className="nav-link">Logout</Link>
            </NavItem>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
