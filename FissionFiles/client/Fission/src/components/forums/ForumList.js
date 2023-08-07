import React, { useContext, useEffect } from 'react';
import { ForumContext } from '../../managers/ForumManager';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForumList = () => {
    const { forums, getAllForums } = useContext(ForumContext);

    useEffect(() => {
        getAllForums();
    }, []);

    return (
        <Container className="mt-4">
            <h2>Forums</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forums.map(forum => (
                        <tr key={forum.id}>
                            <td>{forum.name}</td>
                            <td>{forum.description}</td>
                            <td>
                            <Link to={`/forums/${forum.id}/posts`}>
                                <Button variant="info">View</Button>
                            </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ForumList;