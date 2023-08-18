import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScientistContext } from "../../managers/ScientistManager";
import { UserContext } from "../../managers/UserManager";
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const UpdateScientist = () => {
    const { scientistId } = useParams();
    const { getScientistById, updateScientist } = useContext(ScientistContext);
    const { user } = useContext(UserContext); 
    const [scientist, setScientist] = useState({
        fullName: "",
        description: "",
        imageUrl: "",
        title: "",
        achievements: ""
    });
    const navigate = useNavigate();
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        getScientistById(scientistId).then(data => {
            setScientist(data);
        });
    }, [scientistId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScientist(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateScientist(scientist).then(() => {
            navigate("/scientists");
        });
    };

    if (!isAdmin) {
        navigate("/not-authorized");
        return null;
    }

    return (
        <Container className="mt-4">
            <h2>Update Scientist</h2>
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
                        <Form.Control type="textarea" rows={3} placeholder="Enter description" value={scientist.description} name="description" onChange={handleChange} />
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
                    Update Scientist
                </Button>
            </Form>
        </Container>
    );
}

export default UpdateScientist;
