import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagContext } from '../../managers/TagManager';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import NavBar from '../nav/navbar';

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
        <div className="add-general-page">
        <NavBar />
        <Container className="mt-4 add-general-form p-5">
        <h2 className="important-header">Add Tag</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    
                        <Form.Group as={Row} controlId="tagName0">
                            <Form.Label column sm="2">Tag Name</Form.Label>
                            <Col sm="10">
                            <Form.Control type="text" name="name" value={tag.name} onChange={handleChange} placeholder="Enter tag name" />
                            </Col>
                        </Form.Group>
                    
                    
                        <Form.Group as={Row} controlId="tagDescription" className="mb-4">
                            <Form.Label column sm="2">Tag Description</Form.Label>
                            <Col sm="10">
                            <Form.Control type="text" name="description" value={tag.description} onChange={handleChange} placeholder="Enter tag description" />
                            </Col>
                        </Form.Group>
                    
                </Row>
                <Button bsPrefix="add-figure-button" className="me-2" type="submit">Add Tag</Button>
                <Button bsPrefix="cancel-figure-button" onClick={() => navigate('/tags')}>Cancel</Button>
            </Form>
        </Container>
        </div>
    );
}

export default AddTag;