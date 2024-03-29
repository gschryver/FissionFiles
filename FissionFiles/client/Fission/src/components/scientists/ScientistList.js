import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ScientistContext } from '../../managers/ScientistManager';
import { UserContext } from '../../managers/UserManager';
import { Container, Table, Button } from 'react-bootstrap';
import NavBar from '../nav/navbar';
import '../css/table.css';

const ScientistList = () => {
    const { scientists, getAllScientists, deleteScientist } = useContext(ScientistContext);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        getAllScientists();
        window.scrollTo(0, 0);
    }, []);
    
    
    const handleDelete = (scientistId) => {
        if (window.confirm("WARNING:\n\nAre you sure you want to delete this person? This cannot be undone.")) {
            deleteScientist(scientistId).then(() => {
                getAllScientists();
            });
        }
    }

    return (
        <div className="scientist-list-page">
            <NavBar/>
            <Container className="scientist-list-container">
                <h1 className="important-header mb-3">Important Figures</h1>
                {isAdmin && (
                    <Button bsPrefix="add-figure-button" variant="secondary" as={Link} to={`/scientists/add`}>Add New</Button>
                )}
                <Table className="opaque-table mt-3">
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
                                    <Button bsPrefix="edit-button" onClick={() => navigate(`/scientists/edit/${scientist.id}`)}>Edit</Button>
                                    &nbsp;&nbsp;
                                    <Button bsPrefix="delete-button" onClick={() => handleDelete(scientist.id)}>Delete</Button>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default ScientistList;
