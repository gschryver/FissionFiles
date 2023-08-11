import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PostContext } from "../../managers/PostManager";
import { ForumContext } from "../../managers/ForumManager";
import { CommentContext } from "../../managers/CommentManager";
import { UserContext } from "../../managers/UserManager";
import { TagContext } from "../../managers/TagManager";
import Comment from "../comments/Comment";
import AddComment from "../comments/AddComment";
import { Container, Card, ListGroup, Button, ButtonGroup, Badge} from "react-bootstrap";

const Post = () => {
  const { getPostById, deletePost } = useContext(PostContext);
  const { getForumById } = useContext(ForumContext);
  const { user, banUser } = useContext(UserContext);
  const { getCommentsForPost, updateComment, deleteComment, removeComment } = useContext(CommentContext);
  const { getTagsForPost } = useContext(TagContext);
  const { postId, commentId } = useParams();

  const [post, setPost] = useState(null);
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);


  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;
  const commentRefs = useRef({});

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
        return getTagsForPost(postId);
      })
      .then((fetchedTags) => {
        console.log("Fetched tags", fetchedTags);
        setTags(fetchedTags);
        return getCommentsForPost(postId);
      })
      .then((fetchedComments) => {
        console.log("Fetched comments", fetchedComments);
        setComments(fetchedComments);
      });
    getCommentsForPost(postId).then((fetchedComments) => {
      console.log("Fetched comments", fetchedComments);
      setComments(fetchedComments);

      if (commentId && commentRefs.current[commentId]) {
        commentRefs.current[commentId].scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [postId, commentId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  const handleUpdateComment = (commentId, editedContent) => {
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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId).then(() => {
        navigate(`/forums/${forum.id}/posts`);
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

  const handleBanUser = (userIdToBan) => {
    if (window.confirm("Are you sure you want to ban this user?")) {
      banUser(userIdToBan).then(() => {
        navigate("/users");
      });
    }
  };

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Header>
          <h1>{post.title}</h1>
        </Card.Header>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
            Author:{" "}
            <Link to={`/user/${post.user.id}`}>{post.user.displayName}</Link> |
            Date: {new Date(post.timestamp).toLocaleDateString()} | Tags: &nbsp;
            {tags.length === 0 ? (
              <Badge bg="secondary" className="me-2">
                No Tags
              </Badge>
            ) : (
              tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="me-2">
                  <Link to={`/tags/${tag.id}/posts`} className="text-white">
                    {tag.name}
                  </Link>
                </Badge>
              ))
            )}
          </Card.Subtitle>

          <Card.Text>{post.content}</Card.Text>

          {isAdmin && (
            <ButtonGroup className="mt-3">
              <Button
                variant="primary"
                onClick={() => navigate(`/post/edit/${post.id}`)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          )}
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

        {/* comments - edit comments is managed inline */}
        {comments.length === 0 ? (
          <ListGroup variant="flush">
            <ListGroup.Item>This post has no comments.</ListGroup.Item>
          </ListGroup>
        ) : (
          <ListGroup variant="flush">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
                isAdmin={isAdmin}
                handleUpdate={handleUpdateComment}
                handleDelete={handleDeleteComment}
                handleRemove={handleRemoveComment}
                handleBan={handleBanUser}
              />
            ))}
          </ListGroup>
        )}
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
