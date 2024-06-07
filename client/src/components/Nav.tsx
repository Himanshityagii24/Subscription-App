import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import ModalComponent from './Modal/Modal';

const Nav = () => {
  return (
    <Navbar>
      <NavItem>
        <ModalComponent text="Signup" variant='primary' />
      </NavItem>
      <NavItem>
        <ModalComponent text="Login" variant='danger' />
      </NavItem>
    </Navbar>
  );
};

export default Nav;
