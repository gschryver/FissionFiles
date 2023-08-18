import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ScientistContext } from '../../managers/ScientistManager';
import { UserContext } from '../../managers/UserManager';
import { Container, Table, Button } from 'react-bootstrap';
import NavBar from '../nav/navbar';

const ScientistList = () => {
    const { scientists, getAllScientists, deleteScientist } = useContext(ScientistContext);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        getAllScientists();
    }, []);
    
    // delete a scientist
    const handleDelete = (scientistId) => {
        if (window.confirm("WARNING:\n\nAre you sure you want to delete this scientist? This cannot be undone.")) {
        deleteScientist(scientistId).then(() => {
            getAllScientists();
        });
     }
    }

    return (
        <>
        <NavBar/>
        <Container className="scientist-list-container">
            <h1>Important Figures</h1>
            {isAdmin && (
            <Button className="mb-3" variant="secondary" as={Link} to={`/scientists/add`}>Add an Important Figure</Button>)}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Title</th>
                        {isAdmin && <th>Admin Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {scientists.map(scientist => (
                        <tr key={scientist.id}>
                            <td>
                                <Link to={`/scientist/${scientist.id}`}>{scientist.fullName}</Link>
                            </td>
                            <td>{scientist.title}</td>
                            {isAdmin && <td>
                                <Button variant="primary" onClick={() => navigate(`/scientists/edit/${scientist.id}`)}>Edit</Button>
                                &nbsp;|&nbsp;
                                <Button variant="danger" onClick={() => handleDelete(scientist.id)}>Delete</Button>
                            </td>
                        }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
}

export default ScientistList;
