import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../nav/navbar';

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
        <div className="forum-list-page">
        <NavBar />
        <Container className="general-list-container">
            <h1 className="important-header mb-3">Forums</h1>
            {isAdmin && (
            <Button bsPrefix="add-figure-button" as={Link} to={`/forums/add`}>Add Forum</Button>)}
            <Table className="opaque-table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {isAdmin && (
                        <th>Admin Actions</th>
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
                                <Button bsPrefix="edit-button" className="me-2">Edit</Button>
                            </Link>

                            <Button bsPrefix="deactivate-button" className="me-2" onClick={() => handleDeactivate(forum.id)}>Deactivate</Button>

                            <Button bsPrefix="delete-button" onClick={() => handleDelete(forum.id)}>Delete</Button>
                            </>
                            </td>
                             )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {isAdmin && (
            <>
            <h2 className="important-header mt-4">Deactivated Forums</h2>
            <Table className="opaque-table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forums.filter(forum => !forum.isActive).length === 0 ? (
                        <tr>
                        <td colSpan="3">There are currently no deactivated forums.</td>
                        </tr>
                    ) : (
                        forums.filter(forum => !forum.isActive).map(forum => (
                        <tr key={forum.id}>
                            <td>{forum.name}</td>
                            <td>{forum.description}</td>
                            <td>
                            <Link to={`/forums/${forum.id}/edit`}><Button bsPrefix="edit-button" className="me-2">Edit</Button></Link>

                            <Button bsPrefix="reactivate-button" className="me-2" onClick={() => handleReactivate(forum.id)}>Reactivate</Button>

                            <Button bsPrefix="delete-button" onClick={() => handleDelete(forum.id)}>Delete</Button>
                            </td>
                        </tr>
                        ))
                    )}
                    </tbody>
            </Table>
            </>
            )}
        </Container>
        </div>
    );
}

export default ForumList;