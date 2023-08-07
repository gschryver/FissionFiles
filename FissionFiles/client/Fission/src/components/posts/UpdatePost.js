import React, { useEffect, useState, useContext } from 'react';
import { PostContext } from '../../managers/PostManager';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
    const { getPostById, updatePost } = useContext(PostContext);
    const { postId } = useParams();
    const [postInputModel, setPostInputModel] = useState({
        post: {},
        user: null,
        forum: null
    });

    useEffect(() => {
        getPostById(postId)
            .then(data => {
                setPostInputModel({
                    post: data,
                    user: data.user,
                    forum: data.forum
                });
            });
    }, [postId]);

    const handleInputChange = (event) => {
        const newPost = { ...postInputModel.post };
        newPost[event.target.id] = event.target.value;
        setPostInputModel(prev => ({ ...prev, post: newPost }));
    };

    const handleSubmit = () => {
        updatePost(postInputModel)
            .then(() => {
                console.log('Post updated successfully!');
            })
            .catch(err => {
                console.log('Error updating post:', err.message);
            });
    };

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="title"
                        value={postInputModel.post.title || ''}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        id="content"
                        value={postInputModel.post.content || ''}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Header Image</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="headerImage"
                        value={postInputModel.post.headerImage || ''}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                    Update Post
                </Button>
            </Form>
        </div>
    );
};

export default UpdatePost;

