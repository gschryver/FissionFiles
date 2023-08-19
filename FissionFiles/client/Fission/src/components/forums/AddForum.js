import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { useNavigate } from 'react-router-dom';
import NavBar from '../nav/navbar';

const AddForumForm = () => {
    const { addForum } = useContext(ForumContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    const [newForum, setNewForum] = useState({
        Name: '',
        Description: '',
        IsActive: false,
        UserId: user?.id || null,
    });

    const handleInputChange = (event) => {
        setNewForum({
            ...newForum,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckChange = (event) => {
        setNewForum({
            ...newForum,
            IsActive: event.target.checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addForum(newForum);
        setNewForum({
            Name: '',
            Description: '',
            IsActive: false,
            UserId: user?.id || null,
        });
        navigate('/forums');
    };

    return (
        <div className="add-general-page">
        <NavBar />
        <Container className="mt-4 add-general-form p-5">
        <h2 className="important-header">Add Forum</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="forumName">
                <Form.Label column sm="2">Forum Name</Form.Label>
                <Col sm="10">
                <Form.Control
                    type="text"
                    name="Name"
                    value={newForum.Name}
                    onChange={handleInputChange}
                    required
                />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="forumDescription">
            <Form.Label column sm="2">Description</Form.Label>
            <Col sm="10">
                <Form.Control
                    type="text"
                    name="Description"
                    value={newForum.Description}
                    onChange={handleInputChange}
                    required
                />
            </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 mt-4" controlId="forumIsActive">
            <Form.Label column sm="2">Active?</Form.Label>
            <Col sm="10">
                <Form.Check 
                    type="checkbox" 
                    label="Is Active" 
                    name="IsActive"
                    checked={newForum.IsActive}
                    onChange={handleCheckChange}
                />
            </Col>
            </Form.Group>

            <Button bsPrefix="add-figure-button" className="me-2" type="submit">
            Add
          </Button>
            <Button bsPrefix="cancel-figure-button" onClick={() => navigate(`/forums`)}>
            Cancel
            </Button>
        </Form>
        </Container>
        </div>
    );
};

export default AddForumForm;
