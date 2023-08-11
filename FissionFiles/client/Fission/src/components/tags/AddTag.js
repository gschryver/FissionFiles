import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagContext } from '../../managers/TagManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const AddTag = () => {
    const { addTag } = useContext(TagContext);
    const navigate = useNavigate();

    const [tag, setTag] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTag({
            ...tag,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTag(tag).then(() => {
            navigate('/tags');
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="tagName0">
                            <Form.Label>Tag Name</Form.Label>
                            <Form.Control type="text" name="name" value={tag.name} onChange={handleChange} placeholder="Enter tag name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tagDescription">
                            <Form.Label>Tag Description</Form.Label>
                            <Form.Control type="text" name="description" value={tag.description} onChange={handleChange} placeholder="Enter tag description" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">Add Tag</Button>
            </Form>
        </Container>
    );
}

export default AddTag;