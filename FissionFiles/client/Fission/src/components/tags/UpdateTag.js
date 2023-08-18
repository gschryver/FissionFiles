import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';
import { TagContext } from '../../managers/TagManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import NavBar from '../nav/navbar';

const UpdateTag = () => {
    const { getTagById, updateTag } = useContext(TagContext);
    const { tagId } = useParams();
    const navigate = useNavigate();

    const [tag, setTag] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        getTagById(tagId).then(setTag);
    }, [tagId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTag(prevTag => ({
            ...prevTag,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        updateTag(tag).then(() => {
            navigate("/tags"); 
        });
    };

    return (
        <div className="add-general-page">
        <NavBar />
        <Container className="mt-4 add-general-form p-5">
            <Row>
                <Col>
                <h2 className="important-header">Update Tag</h2>
                    <Form>
                        <Form.Group as={Row}>
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="text" 
                                name="name"
                                value={tag.name}
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
                                value={tag.description}
                                onChange={handleInputChange}
                            />
                            </Col>
                        </Form.Group>
                        <Button bsPrefix="add-figure-button" className="me-2" onClick={handleSubmit}>
                            Update
                        </Button>
                        <Button bsPrefix="cancel-figure-button" onClick={() => navigate("/tags")}>
                            Cancel
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default UpdateTag;
