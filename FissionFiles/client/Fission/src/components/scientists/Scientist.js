import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ScientistContext } from '../../managers/ScientistManager';
import { UserContext } from '../../managers/UserManager';
import NavBar from '../nav/navbar';
import '../css/scientist.css';
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
        <div className="scientist-bg scientist-hero">
        <NavBar fadeInFromTop={true}/>
        <Container >
        <div className="hero-section">
        <div className="scientist-title">
                        {scientist.title}
                    </div>
                <div className="scientist-name">
                    {scientist.fullName}
                </div>
                <Image 
                    src={scientist.imageUrl} 
                    alt={scientist.fullName} 
                    className="scientist-image" 
                    fluid 
                />
            </div>
            </Container>

<Container fluid className="scientist-bg scientist-bio">
            <Row>
                <Col md={8} className="mx-auto text-center scientist-info p-5">
                  
                            <h2 className="scientist-bio-name">{scientist.fullName}</h2>
                            <p className="scientist-bio-title">{scientist.title}</p>
                            <p className="scientist-description">{scientist.description}</p>
                            <p className="scientist-quote">"{scientist.achievements}"</p>
                            {isAdmin && 
                            <Button variant="primary" onClick={() => navigate(`/scientists/edit/${scientist.id}`)}>Edit</Button>
                            }
                            <Link to="/scientists" className="btn btn-secondary ml-2">Back to List</Link>
                      
                </Col>
            </Row>
            </Container>
        </div>
    );
}

export default Scientist;
