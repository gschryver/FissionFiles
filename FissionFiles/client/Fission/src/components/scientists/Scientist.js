import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ScientistContext } from '../../managers/ScientistManager';
import { UserContext } from '../../managers/UserManager';
import { Card, Container, Button, Row, Col, Image } from 'react-bootstrap';

const Scientist = () => {
    const { scientistId } = useParams();
    const { getScientistById } = useContext(ScientistContext);
    const { user } = useContext(UserContext);
    const [scientist, setScientist] = useState(null);
    const navigate = useNavigate();
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        getScientistById(scientistId).then(response => {
            setScientist(response);
        });
    }, [scientistId, getScientistById]);

    if (!scientist) {
        return <div>Loading...</div>; 
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <Image src={scientist.imageUrl} alt={scientist.fullName} fluid roundedCircle />
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Header as="h3">{scientist.fullName}</Card.Header>
                        <Card.Body>
                            <Card.Title>{scientist.title}</Card.Title>
                            <Card.Text>{scientist.description}</Card.Text>
                            <Card.Text><strong>Achievements:</strong> {scientist.achievements}</Card.Text>
                            {isAdmin && 
                            <Button variant="primary" onClick={() => navigate(`/scientists/edit/${scientist.id}`)}>Edit</Button>
                            }
                            <Link to="/scientists" className="btn btn-secondary ml-2">Back to List</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Scientist;
