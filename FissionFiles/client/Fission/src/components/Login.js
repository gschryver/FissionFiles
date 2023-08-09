import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../managers/UserManager";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext); 

  const [email, setEmail] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email })
      .then((user) => {
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <Form onSubmit={loginSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Row>
            <em>
              Not registered? <Link to="/register">Register</Link>
            </em>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
