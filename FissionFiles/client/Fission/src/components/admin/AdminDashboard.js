import React, { useContext } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (user && user.userTypeId !==1) {
        navigate("/not-authorized");
        return null;
      }
       
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <h3>Admin Dashboard</h3>
                    <ListGroup>
                        <ListGroup.Item action onClick={() => navigate("/articles/add")}>
                            Add Article
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => navigate("/users")}>
                            User List
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => navigate("/forums")}>
                            Manage Forums
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => navigate("/forums/add")}>
                            Add Forum
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => navigate("/posts/add")}>
                            Add Post
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;
