import React, { useState, useContext, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { UserContext } from "../../managers/UserManager";
import { useNavigate } from 'react-router-dom';
import atom from "../img/atom.png";
import "./navbar.css";

const NavBar = ({ className, bgColor = "navbar-background", fadeInFromTop = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;
  const navBarClass = fadeInFromTop ? 'fade-in-from-top' : '';

  const handleLogout = () => {
    logout().then(() => {
      navigate('/'); // Redirect to home page after logout
    });
  };


  return (
    <Navbar expand="lg" bg={bgColor} variant="dark" className={navBarClass}>

      <Container fluid>
        <Row className="align-items-center w-100">
          <Col className="d-flex justify-content-start">
          <Nav className="navbar-nav">
            {user && (
              <>
                {isAdmin && (
                  <>
                    <Nav.Item className="me-3">
                      <Nav.Link as={RRNavLink} to="/admin-dashboard" className="hover-underline-animation">
                        Admin
                      </Nav.Link>
                    </Nav.Item>
                  </>
                )}
                <Nav.Item className="me-3">
                  <Nav.Link as={RRNavLink} to="/categories/8/articles" className="hover-underline-animation">
                    Key Locations
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-3">
                  <Nav.Link as={RRNavLink} to="/categories/9/articles" className="hover-underline-animation">
                    Significant Events
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            </Nav>
          </Col>
          
          <Col className="d-flex justify-content-center">
            <Navbar.Brand as={RRNavLink} to="/">
              <Image src={atom} alt="Atom" className="navbar-logo" />
            </Navbar.Brand>
          </Col>
          
          <Col className="d-flex justify-content-end">
            <Nav className="navbar-nav">
            {user ? (
              <>
                <Nav.Item className="me-3">
                  <Nav.Link as={RRNavLink} to="/scientists" className="hover-underline-animation">
                    Important Figures
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-3">
                  <Nav.Link as={RRNavLink} to="/forums" className="hover-underline-animation">
                    Forums
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-3">
                  <Nav.Link as={RRNavLink} to={`/user/${user.id}`} className="hover-underline-animation">
                    My Profile
                  </Nav.Link>
                </Nav.Item>
                <Button bsPrefix="logout-button" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Item className="me-3">
                  <Nav.Link as={RRNavLink} to="/login" className="hover-underline-animation">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={RRNavLink} to="/register" className="hover-underline-animation">
                    Register
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavBar;
