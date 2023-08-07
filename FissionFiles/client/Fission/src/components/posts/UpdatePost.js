import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../../managers/PostManager';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { Form, Button } from 'react-bootstrap';

const UpdatePostForm = () => {
    const { updatePost, getPostById } = useContext(PostContext);
    const { user } = useContext(UserContext);
    const { forum } = useContext(ForumContext);
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(
        {
            userId: user?.id || "",
            forumId: forum?.id || "",
            title: "",
            timestamp: "",
            content: "",
            headerImage: "",
            isDeleted: false
        }
    );

    useEffect(() => {
       getPostById(postId)
            .then(fetchedPost => {
                console.log("Fetched post", fetchedPost);
                setPost(fetchedPost);
            });
    }, [postId, getPostById]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost({
            ...post,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const postToUpdate = {
            id: post.id,
            userId: post.userId,
            forumId: post.forumId,
            title: post.title,
            timestamp: post.timestamp,
            content: post.content,
            headerImage: post.headerImage,
            isDeleted: post.isDeleted,
        };

        updatePost(postToUpdate).then(() => {
        console.log("Post updated successfully!")
        navigate(`/post/${postId}`)
    })
}

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={post.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" name="content" value={post.content} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formHeaderImage">
                <Form.Label>Header Image URL</Form.Label>
                <Form.Control type="text" name="headerImage" value={post.headerImage} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update Post
            </Button>
        </Form>
    );
};

export default UpdatePostForm;