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
import NavBar from "../nav/navbar";

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
    <div className="add-post-page">
    <NavBar/>
    <Container className="mt-4 post-background p-5">
    <div className="mb-4">
        {forum && (
          <Button
            variant="secondary"
            bsPrefix="edit-button"
            onClick={() => navigate(`/forums/${forum.id}/posts`)}
          >
            Back to {forum.name}
          </Button>
        )}
      </div>
      <Card className="mb-4">
        <Card.Header>
          <h1 className="important-header">{post.title}</h1>
        </Card.Header>
        <Card.Body>
        <Card.Subtitle className="mt-2 mb-2 text-muted">
            <span className="bold-mini-header">Author:</span>{" "}
            <Link to={`/user/${post.user.id}`}>{post.user.displayName}</Link>&nbsp; |&nbsp;
            <span className="bold-mini-header">Date:</span> {new Date(post.timestamp).toLocaleDateString()} &nbsp;|&nbsp;<span className="bold-mini-header">Tags:</span> &nbsp;
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
            <>
              <Button
                bsPrefix="edit-button"
                className="me-2"
                onClick={() => navigate(`/post/edit/${post.id}`)}
              >
                Edit
              </Button>
              <Button bsPrefix="delete-button" onClick={handleDelete}>
                Delete
              </Button>
            </>
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
          <h2 className="important-header">Replies</h2>
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
     
    </Container>
    </div>
  );
};

export default Post;
