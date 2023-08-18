import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScientistContext } from "../../managers/ScientistManager";
import { UserContext } from "../../managers/UserManager";
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import NavBar from '../nav/navbar';


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
        <div className="add-scientist-page">
        <NavBar />
        <Container className="mt-4 add-scientist-form p-5">
            <h2 className="important-header">Update Important Figure</h2>
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
                <Form.Group as={Row} controlId="achievements" className="mb-4">
                    <Form.Label column sm="2">Quote</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows={3} placeholder="Enter achievements" value={scientist.achievements} name="achievements" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button bsPrefix="add-figure-button" className="me-2" type="submit">
                        Update
                    </Button>
                    <Button variant="secondary" bsPrefix="cancel-figure-button" className="ml-2" onClick={() => navigate("/scientists")}>
                        Cancel
                    </Button>
            </Form>
        </Container>
        </div>
    );
}

export default UpdateScientist;
