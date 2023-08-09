import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForumList = () => {
    const { forums, getAllForums, deleteForum, deactivateForum, reactivateForum } = useContext(ForumContext);
    const { user } = useContext(UserContext);
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        getAllForums();
    }, []);

    const handleDelete = (forumId) => {
        if (window.confirm("WARNING: \n\nThis action will permanently delete a forum and all of its associated posts and comments.\n \nAre you sure you want to delete the forum? This action cannot be undone.")) {
            deleteForum(forumId);
        }
    };

    const handleDeactivate = (forumId) => {
        if (window.confirm("Are you sure you want to deactivate this forum?")) {
            deactivateForum(forumId);
        }
    };

    const handleReactivate = (forumId) => {
        if (window.confirm("Are you sure you want to reactivate this forum?")) {
            reactivateForum(forumId);
        }
    };

    
    return (
        <Container className="mt-4">
            <h2>Forums</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {isAdmin && (
                        <th>Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {forums.filter(forum => forum.isActive).map(forum=> (
                        <tr key={forum.id}>
                            <td><Link to={`/forums/${forum.id}/posts`}>{forum.name}</Link></td>
                            <td>{forum.description}</td>
                            {isAdmin && (
                            <td>
                            <>
                            <Link to={`/forums/${forum.id}/edit`}>
                                <Button variant="warning">Edit</Button>
                            </Link>
                            <Button variant="secondary" onClick={() => handleDeactivate(forum.id)}>Deactivate</Button>
                            <Button variant="danger" onClick={() => handleDelete(forum.id)}>Delete</Button>
                            </>
                            </td>
                             )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {isAdmin && (
            <>
            <h2 className="mt-4">Deactivated Forums</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forums.filter(forum => !forum.isActive).map(forum => (
                        <tr key={forum.id}>
                            <td>{forum.name}</td>
                            <td>{forum.description}</td>
                            <td>
                                <Button variant="success" onClick={() => handleReactivate(forum.id)}>Reactivate</Button>
                                <Link to={`/forums/${forum.id}/edit`}><Button variant="warning">Edit</Button></Link>
                                <Button variant="danger" onClick={() => handleDelete(forum.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </>
            )}
        </Container>
    );
}

export default ForumList;