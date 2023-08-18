import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScientistContext } from '../../managers/ScientistManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const AddScientist = () => {
    const { addScientist } = useContext(ScientistContext);
    const navigate = useNavigate();

    const [scientist, setScientist] = useState({
        fullName: "",
        description: "",
        imageUrl: "",
        title: "",
        achievements: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScientist(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addScientist(scientist).then(() => {
            navigate("/scientists");
        });
    };

    return (
        <Container className="mt-4">
            <h2>Add Important Figure</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="fullName">
                    <Form.Label column sm="2">Full Name</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Enter full name" value={scientist.fullName} name="fullName" onChange={handleChange} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="title">
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Enter title" value={scientist.title} name="title" onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="description">
                    <Form.Label column sm="2">Description</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows={3} placeholder="Enter description" value={scientist.description} name="description" onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="imageUrl">
                    <Form.Label column sm="2">Image URL</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Enter image URL" value={scientist.imageUrl} name="imageUrl" onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="achievements">
                    <Form.Label column sm="2">Achievements</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows={3} placeholder="Enter achievements" value={scientist.achievements} name="achievements" onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Scientist
                </Button>
            </Form>
        </Container>
    );
}

export default AddScientist;
