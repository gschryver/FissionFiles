import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PostContext } from "../../managers/PostManager";
import { ForumContext } from "../../managers/ForumManager";
import { CommentContext } from "../../managers/CommentManager";
import { UserContext } from "../../managers/UserManager";
import AddComment from "../comments/AddComment";
import { Container, Card, ListGroup, Button, Form } from "react-bootstrap";

const Post = () => {
  const { getPostById } = useContext(PostContext);
  const { getForumById } = useContext(ForumContext);
  const { user } = useContext(UserContext);
  const { getCommentsForPost, updateComment, deleteComment, removeComment } =
    useContext(CommentContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const isAdmin = user && user.userTypeId === 1;

  useEffect(() => {
    getPostById(postId)
      .then((fetchedPost) => {
        console.log("Fetched post", fetchedPost);
        setPost(fetchedPost);
        return getForumById(fetchedPost.forumId);
      })
      .then((fetchedForum) => {
        console.log("Fetched forum", fetchedForum);
        setForum(fetchedForum);
        return getCommentsForPost(postId);
      })
      .then((fetchedComments) => {
        console.log("Fetched comments", fetchedComments);
        setComments(fetchedComments);
      });
    getCommentsForPost(postId).then((fetchedComments) => {
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

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
        deleteComment(commentId).then(() => {
            getCommentsForPost(postId).then(setComments);
        });
    }
};

const handleRemoveComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove this comment?")) {
        removeComment(commentId).then(() => {
            getCommentsForPost(postId).then(setComments);
        });
    }
};

  const timePosted = () => {
    const timePosted = new Date(post.timestamp);
    return timePosted.toLocaleDateString();
  };

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Header>
          <h1>{post.title}</h1>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
          Author: <Link to={`/user/${post.user.id}`}>{post.user.displayName}</Link> | Date: 
            {new Date(post.timestamp).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text>{post.content}</Card.Text>
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
        {/* edit comments inline */}
        <ListGroup variant="flush">
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <strong>
                {comment.isDeleted || comment.isRemoved
                ? "[deleted]"
                : <Link to={`/user/${comment.userId}`}>{comment.user.displayName}</Link>}
                {" "}
                <small>{timePosted()}</small>
            </strong>

              {comment.isRemoved ? (
                <p>
                  [This comment was removed for violating community policy.]
                </p>
              ) : comment.isDeleted ? (
                <p>{comment.content}</p>
              ) : editingCommentId === comment.id ? (
                <div>
                  <Form.Control
                    as="textarea"
                    defaultValue={comment.content}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <Button
                    variant="link"
                    onClick={() => handleUpdateComment(comment.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => setEditingCommentId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <p>{comment.content}</p>
                  {comment.userId === user.id && (
                    <Button
                      variant="primary"
                      onClick={() => setEditingCommentId(comment.id)}
                    >
                      Edit
                    </Button>
                  )}

                  {/* if the comment was made by the current user, show the delete button */}
                  {comment.userId === user.id && (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </Button>
                  )}

                  {/* if the current user is an admin, show the remove button */}
                  {isAdmin && (
                    <Button
                      variant="warning"
                      onClick={() => handleRemoveComment(comment.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <div className="mt-3">
        {forum && (
          <Button
            variant="secondary"
            as={Link}
            to={`/forums/${forum.id}/posts`}
          >
            Back to {forum.name}
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Post;
