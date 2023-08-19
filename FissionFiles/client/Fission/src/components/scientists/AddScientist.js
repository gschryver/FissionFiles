import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScientistContext } from '../../managers/ScientistManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import NavBar from '../nav/navbar';

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
        <div class="add-general-page">
        <NavBar />
        <Container className="mt-4 add-scientist-form p-5">
            <h2 className="important-header">Add Important Figure</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="fullName">
                    <Form.Label column sm="2">Full Name</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Enter full name" value={scientist.fullName} name="fullName" onChange={handleChange} className="form-input-transparent" required />
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

                <Form.Group as={Row} controlId="achievements" className="mb-4">
                    <Form.Label column sm="2">Quote</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows={3} placeholder="Enter quote" value={scientist.achievements} name="achievements" onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Button bsPrefix="add-figure-button" className="me-2" type="submit">
                    Add
                </Button>
                <Button variant="secondary" bsPrefix="cancel-figure-button" className="ml-2" onClick={() => navigate("/scientists")}>
                    Cancel
                </Button>
            </Form>
        </Container>
        </div>
    );
}

export default AddScientist;
