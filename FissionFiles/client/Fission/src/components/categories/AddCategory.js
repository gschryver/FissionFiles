import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from '../../managers/CategoryManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const AddCategory = () => {
    const { addCategory } = useContext(CategoryContext);
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory(category).then(() => {
            navigate('/categories');
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="categoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" name="name" value={category.name} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="categoryDescription">
                            <Form.Label>Category Description</Form.Label>
                            <Form.Control type="text" name="description" value={category.description} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    </Row>
                    <Button variant="primary" type="submit">Add Category</Button>
                </Form>
        </Container>
        );
}

export default AddCategory;