import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ForumContext } from "../../managers/ForumManager";
import { PostContext } from "../../managers/PostManager";
import { UserContext } from "../../managers/UserManager";
import { TagContext } from "../../managers/TagManager";
import { Table, Button, Container, Badge } from "react-bootstrap";
import NavBar from "../nav/navbar";

const PostList = () => {
  const { getPostByForumId, getForumById } = useContext(ForumContext);
  const { getTagsForPost } = useContext(TagContext);
  const { post, deletePost } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [forum, setForum] = useState(null);
  const [postTags, setPostTags] = useState({});
  const { forumId } = useParams();
  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;

  useEffect(() => {
    getPostByForumId(forumId).then((fetchedPosts) => {
      setPosts(fetchedPosts);

      fetchedPosts.forEach(async (post) => {
        const tags = await getTagsForPost(post.id);
        setPostTags((prevTags) => ({
          ...prevTags,
          [post.id]: tags,
        }));
      });
    });
    getForumById(forumId).then(setForum);
  }, [forumId, getPostByForumId, getForumById]);

  const goToEdit = (postId) => {
    navigate(`/post/edit/${postId}`);
  };

  const handleDelete = (postId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This cannot be undone.",
      )
    ) {
      deletePost(postId)
        .then(() => {
          console.log("Post deleted successfully");
          setPosts(posts.filter((post) => post.id !== postId));
        })
        .catch((error) => {
          console.error("Error deleting the post:", error);
        });
    }
  };

  return (
    <div className="post-list-page">
    <NavBar />
    <Container className="general-list-container">
      {forum && <h1 className="important-header mb-3">Posts for {forum.name}</h1>}
      {isAdmin && (
        <Button
        bsPrefix="edit-button"
        className="me-2"
        onClick={() => navigate(`/posts/add`)}
      >
        Add a New Post
      </Button>
      )}
      <Button 
      bsPrefix="reactivate-button"
      onClick={() => navigate(`/forums/`)}
      >
        Back to Forums
      </Button>
      <Table className="opaque-table mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Date</th>
            {/* <th>Tags</th> */}
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.content}</td>
              <td>{post.user ? post.user.displayName : "Unknown"}</td>
              <td>{new Date(post.timestamp).toLocaleDateString()}</td>
              {/* <td>
  {Array.isArray(postTags[post.id]) &&
    postTags[post.id].map((tag) => (
      <Link key={tag.id} to={`/tags/${tag.id}/posts`} className="mr-2">
        <Badge variant="secondary" className="me-2">{tag.name}</Badge>
      </Link>
    ))}
</td> */}
              {isAdmin && (
                <td>
                  <Button bsPrefix="edit-button" className="me-2" onClick={() => goToEdit(post.id)}>
                    Edit
                  </Button>
                  <Button
                    bsPrefix="delete-button"
                    variant="danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
              

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  );
};

export default PostList;
