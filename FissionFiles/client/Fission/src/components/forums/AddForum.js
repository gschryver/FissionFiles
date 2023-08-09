import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { useNavigate } from 'react-router-dom';

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
        <Container className="mt-4">
        <h2>Add Forum</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="forumName">
                <Form.Label>Forum Name</Form.Label>
                <Form.Control
                    type="text"
                    name="Name"
                    value={newForum.Name}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="forumDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="Description"
                    value={newForum.Description}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="forumIsActive">
                <Form.Check 
                    type="checkbox" 
                    label="Is Active" 
                    name="IsActive"
                    checked={newForum.IsActive}
                    onChange={handleCheckChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Add Forum
            </Button>
        </Form>
        </Container>
    );
};

export default AddForumForm;
