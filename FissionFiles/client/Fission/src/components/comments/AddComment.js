import React, { useState, useContext } from 'react';
import { CommentContext } from '../../managers/CommentManager';
import { UserContext } from '../../managers/UserManager';
import { Form, Button } from 'react-bootstrap';

const AddComment = ({ postId, onCommentAdded }) => {
    const { user } = useContext(UserContext);
    const [content, setContent] = useState("");
    const { addComment } = useContext(CommentContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = {
            userId: user?.id || null,
            postId: postId,
            content: content,
            timestamp: new Date().toISOString(),
        };
        
        addComment(comment).then(() => {
            setContent("");
            
            if (onCommentAdded) {
                onCommentAdded();
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="commentContent">
                <Form.Label>Add a Comment</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={content} 
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write your comment here..." 
                />
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

export default AddComment;
