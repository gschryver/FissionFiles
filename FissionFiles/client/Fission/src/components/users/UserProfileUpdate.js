import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../managers/UserManager";
import { useParams, useNavigate } from "react-router-dom";

function UpdateUserProfile() {
  const { userId } = useParams();
  const [localUser, setLocalUser] = useState(null);
  const { getUserById, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId).then(setLocalUser);
  }, [userId, getUserById]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(localUser).then((updatedUser) => {
      // Handle successful update
      setLocalUser(updatedUser);

      // Navigate back to the user profile
      navigate(`/user/${updatedUser.id}`);
    });
  };

  if (!localUser) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={localUser.firstName || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={localUser.lastName || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={localUser.email || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="text"
                name="avatar"
                value={localUser.avatar || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={localUser.bio || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateUserProfile;
