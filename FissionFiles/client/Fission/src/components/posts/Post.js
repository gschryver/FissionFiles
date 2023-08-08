import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostContext } from '../../managers/PostManager';
import { ForumContext } from '../../managers/ForumManager';
import { CommentContext } from '../../managers/CommentManager';
import { UserContext } from '../../managers/UserManager';
import AddComment from '../comments/AddComment';
import { Container, Card, ListGroup, Button, Form } from 'react-bootstrap';

const Post = () => {
    const { getPostById } = useContext(PostContext);
    const { getForumById } = useContext(ForumContext);
    const { user } = useContext(UserContext);
    const { getCommentsForPost, updateComment } = useContext(CommentContext);
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [forum, setForum] = useState(null);
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    useEffect(() => {
        getPostById(postId)
            .then(fetchedPost => {
                console.log("Fetched post", fetchedPost);
                setPost(fetchedPost);
                return getForumById(fetchedPost.forumId);
            })
            .then(fetchedForum => {
                console.log("Fetched forum", fetchedForum);
                setForum(fetchedForum);
                return getCommentsForPost(postId);
            })
            .then(fetchedComments => {
                console.log("Fetched comments", fetchedComments);
                setComments(fetchedComments);
            });
    }, [postId]);

    if (!post) {
        return <p>Loading...</p>;
    }

    const handleUpdateComment = (commentId) => {
        const updatedComment = {
            id: commentId,
            userId: user?.id || null,
            postId: postId,
            timestamp: new Date().toISOString(),
            content: editedContent,
            isDeleted: false,
            isRemoved: false,
        };
        updateComment(updatedComment).then(() => {
            setEditingCommentId(null);
            getCommentsForPost(postId).then(setComments);
        });
    };
    

    return (
        <Container className="mt-4">
            <Card className="mb-4">
                <Card.Header>
                    <h1>{post.title}</h1>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        Author: {post.user.displayName} | Date: {new Date(post.timestamp).toLocaleDateString()}
                    </Card.Subtitle>
                    <Card.Text>
                        {post.content}
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* Add comment */}
            <AddComment 
                postId={postId} 
                onCommentAdded={() => getCommentsForPost(postId).then(setComments)}
            />
            <Card>
                <Card.Header>
                    <h2>Replies</h2>
                </Card.Header>
            {/* Edit comments inline */}
                <ListGroup variant="flush">
            {comments.map(comment => (
                <ListGroup.Item key={comment.id}>
                    <strong>{comment.user.displayName}</strong>
                    {editingCommentId === comment.id ? (
                        <div>
                            <Form.Control 
                                as="textarea"
                                defaultValue={comment.content}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <Button variant="link" onClick={() => handleUpdateComment(comment.id)}>Save</Button>
                            <Button variant="link" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                        </div>
                    ) : (
                        <div>
                            <p>{comment.content}</p>
                            {comment.userId === user.id && <Button variant="link" onClick={() => setEditingCommentId(comment.id)}>Edit</Button>}
                            <small className="text-muted">
                                Date: {new Date(comment.timestamp).toLocaleDateString()}
                            </small>
                        </div>
                    )}
                </ListGroup.Item>
            ))}
        </ListGroup>
            </Card>
            <div className="mt-3">
                {forum && <Button variant="secondary" as={Link} to={`/forums/${forum.id}/posts`}>Back to {forum.name}</Button>}
            </div>
        </Container>
    );
}

export default Post;
