import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavLink } from "react-bootstrap";
import { UserContext } from "../managers/UserManager";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand as={RRNavLink} to="/">
        Fission Files
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
      <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
        <Nav className="mr-auto">
          {user && (
            <>
              <NavItem>
                <NavLink as={RRNavLink} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  as="a"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </>
          )}
          {!user && (
            <>
              <NavItem>
                <NavLink as={RRNavLink} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={RRNavLink} to="/register">
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
