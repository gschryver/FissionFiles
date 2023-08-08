import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForumList = () => {
    const { forums, getAllForums, deleteForum } = useContext(ForumContext);
    const { user } = useContext(UserContext);
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        getAllForums();
    }, []);

    const handleDelete = (forumId) => {
        deleteForum(forumId);
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
                    {forums.map(forum => (
                        <tr key={forum.id}>
                            <td><Link to={`/forums/${forum.id}/posts`}>{forum.name}</Link></td>
                            <td>{forum.description}</td>
                            {isAdmin && (
                            <td>
                          
                            <>
                            <Link to={`/forums/${forum.id}/edit`}>
                                <Button variant="warning">Edit</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleDelete(forum.id)}>Delete</Button>
                            </>
                            </td>
                             )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ForumList;