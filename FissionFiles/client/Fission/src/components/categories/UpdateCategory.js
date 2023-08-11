import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';
import { CategoryContext } from '../../managers/CategoryManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

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
        <Container className="mt-4">
            <Row>
                <Col>
                    <h2>Update Category</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name"
                                value={category.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="description"
                                value={category.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit}>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateCategory;