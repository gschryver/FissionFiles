import React, { useState, useContext, useEffect } from "react";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem, NavLink } from "react-bootstrap";
import { UserContext } from "../managers/UserManager";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarOpaque, setIsNavbarOpaque] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);


  const isAdmin = user && user.userTypeId === 1;
  console.log("isAdmin", isAdmin)

  const handleLogout = () => {
    logout().then(() => {
      navigate('/'); // Redirect to home page after logout
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavbarOpaque(true);
      } else {
        setIsNavbarOpaque(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar className={`navbar ${isNavbarOpaque ? "opaque-navbar" : "transparent-navbar"}`} expand="md">

      <Navbar.Brand as={RRNavLink} to="/">
        Fission Files
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
      <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
        <Nav className="mr-auto">
          {user && (
            <>
              {isAdmin && (
                <>
                <NavItem>
                  <NavLink as={RRNavLink} to="/admin-dashboard">
                    Admin Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink as={RRNavLink} to="/tags">
                    Tags
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink as={RRNavLink} to="/categories">
                    Categories
                  </NavLink>
                </NavItem>
                </>
              )}
              <NavItem>
                <NavLink as={RRNavLink} to="/articles">
                  Articles
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={RRNavLink} to="/scientists">
                  Scientists
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={RRNavLink} to="/forums">
                  Forums
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={RRNavLink} to={`/user/${user.id}`}>
                  My Profile
                </NavLink>
              </NavItem>
              <button onClick={handleLogout}>Logout</button>
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
