import React, { useState, useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image, Container, Row, Col } from "react-bootstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { UserContext } from "../../managers/UserManager";
import { useNavigate } from 'react-router-dom';
import atom from "../img/atom.png";
import "./navbar.css";

const NavBar = ({ fixed = "top", bgColor = "navbar-background", fadeIn = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;
  const navBarClass = fadeIn ? 'fade-in-from-top' : '';

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout().then(() => {
      navigate('/'); // Redirect to home page after logout
    });
  };

  return (
    <Navbar expand="lg" bg={bgColor} variant="dark" fixed={fixed} className={navBarClass}>
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
                        Admin Dashboard
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="me-3">
                      <Nav.Link as={RRNavLink} to="/tags" className="hover-underline-animation">
                        Tags
                      </Nav.Link>
                    </Nav.Item>
                  </>
                )}
                <Nav.Item className="me-3">
                  <Nav.Link as={RRNavLink} to="/articles" className="hover-underline-animation">
                    Articles
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
                    Scientists
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
                <button onClick={handleLogout}>Logout</button>
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
