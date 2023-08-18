import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';
import { CategoryContext } from '../../managers/CategoryManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import NavBar from '../nav/navbar';

const UpdateCategory = () => {
    const { getCategoryById, updateCategory } = useContext(CategoryContext);
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        getCategoryById(categoryId)
            .then(category => setCategory(category))
    }, [categoryId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: value
        }))
    };

    const handleSubmit = () => {
        updateCategory(category)
            .then(() => navigate('/categories'))
    }

    return (
        <div className="add-general-page">
        <NavBar />
        <Container className="mt-4 add-general-form p-5">
                    <h2 className="important-header">Update Category</h2>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Name</Form.Label>
                            <Col sm="10">
                            <Form.Control 
                                type="text" 
                                name="name"
                                value={category.name}
                                onChange={handleInputChange}
                            />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm="2">Description</Form.Label>
                            <Col sm="10">
                            <Form.Control 
                                type="text" 
                                name="description"
                                value={category.description}
                                onChange={handleInputChange}
                            />
                            </Col>
                        </Form.Group>
                        <Button bsPrefix="add-figure-button" className="me-2" onClick={handleSubmit}>
                            Update
                        </Button>
                        <Button variant="secondary" bsPrefix="cancel-figure-button" className="ml-2" onClick={() => navigate("/categories")}>
                            Cancel
                        </Button>
                    </Form>
        </Container>
        </div>
    );
}

export default UpdateCategory;