import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';
import { TagContext } from '../../managers/TagManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

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
        <Container className="mt-4">
            <Row>
                <Col>
                    <h2>Update Tag</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name"
                                value={tag.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="description"
                                value={tag.description}
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

export default UpdateTag;
