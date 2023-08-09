import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../managers/UserManager";

const Register = () => {
  const { register } = useContext(UserContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    creationDate: new Date(),
    avatar: "default.jpg",
    bio: "",
    isActive: true,
    userTypeId: 2, 
    articles: [],
    posts: [],
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    register(user)
      .then(() => {
      })
      .catch((err) => {
        setError("Registration failed");
      });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
            <h2>Register New User</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" value={user.firstName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={user.lastName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="displayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" name="displayName" value={user.displayName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
