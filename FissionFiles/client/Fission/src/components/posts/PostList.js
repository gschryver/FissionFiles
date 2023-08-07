import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ForumContext } from '../../managers/ForumManager';
import { Table, Button, Container } from 'react-bootstrap';

const PostList = () => {
    const { getPostByForumId, getForumById } = useContext(ForumContext);
    const [posts, setPosts] = useState([]); 
    const [forum, setForum] = useState(null);
    const navigate = useNavigate();
    const { forumId } = useParams(); 

    useEffect(() => {
        getPostByForumId(forumId).then(setPosts);
        getForumById(forumId).then(setForum);  
    }, [forumId, getPostByForumId, getForumById]);

    const goToEdit = (postId) => {
        navigate(`/post/edit/${postId}`);
    };

    return (

        <Container className="mt-4">
            <Link to="/forums">Back to Forums List</Link>
            {forum && <h1>Posts for {forum.name}</h1>}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>
                                <Link to={`/post/${post.id}`}>
                                    {post.title}
                                </Link>
                            </td>
                            <td>{post.content}</td>
                            <td>{post.user ? post.user.displayName : 'Unknown'}</td>
                            <td>{new Date(post.timestamp).toLocaleDateString()}</td>
                            <td>
                                <Button variant="primary" onClick={() => goToEdit(post.id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                    </Container>
    );
}

export default PostList;
