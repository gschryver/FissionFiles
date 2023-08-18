import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostContext } from "../../managers/PostManager";
import { ForumContext } from "../../managers/ForumManager";
import { UserContext } from "../../managers/UserManager";
import { TagContext } from "../../managers/TagManager";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import NavBar from "../nav/navbar";

const UpdatePostForm = () => {
  const { updatePost, getPostById } = useContext(PostContext);
  const { tags, getAllTags, addTagsToPost, getTagsForPost, removeTagFromPost } =
    useContext(TagContext);
  const { user } = useContext(UserContext);
  const { forum } = useContext(ForumContext);
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    userId: user?.id || "",
    forumId: forum?.id || "",
    title: "",
    timestamp: "",
    content: "",
    headerImage: "",
    isDeleted: false,
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [initialTags, setInitialTags] = useState([]);


  useEffect(() => {
    getPostById(postId)
      .then((fetchedPost) => {
        setPost(fetchedPost);
        return getTagsForPost(fetchedPost.id);
      })
      .then((fetchedTags) => {
        const tagIds = fetchedTags.map((tag) => tag.id);
        setSelectedTags(tagIds);
        setInitialTags(tagIds);
      })
      .catch((error) => console.error("Error fetching post and tags:", error));
  }, [postId, getPostById]);


  useEffect(() => {
    getAllTags();
  }, []); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value, 
    });
  };

  const handleTagChange = (evt) => {
    const tagId = Number(evt.target.value);
    const isChecked = evt.target.checked;

    if (isChecked) {
      setSelectedTags((prevTags) => [...prevTags, tagId]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((id) => id !== tagId));
    }
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

    const tagsToAdd = selectedTags.filter(
      (tagId) => !initialTags.includes(tagId),
    );
    const tagsToRemove = initialTags.filter(
      (tagId) => !selectedTags.includes(tagId),
    );

    updatePost(postToUpdate)
      .then(() => {
        if (tagsToAdd.length) {
          return addTagsToPost(post.id, tagsToAdd);
        }
      })
      .then(() => {
        if (tagsToRemove.length) {
          return Promise.all(
            tagsToRemove.map((tagId) => {
              return removeTagFromPost(post.id, tagId);
            }),
          );
        }
      })
      .then(() => {
        console.log("Post and tags updated successfully!");
        navigate(`/post/${postId}`);
      })
      .catch((err) => console.error("Error updating post and tags:", err));
  };

  return (
    <div class="add-general-page">
    <NavBar/>
    <Container className="mt-4 add-post-form p-5">
      <h2 className="important-header">Update Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formTitle">
         <Form.Label column sm="2">Title</Form.Label>
         <Col sm="10">
          <Form.Control
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formContent">
         <Form.Label column sm="2">Content</Form.Label>
         <Col sm="10">
          <Form.Control
            as="textarea"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHeaderImage">
         <Form.Label column sm="2">Header Image URL</Form.Label>
          <Col sm="10">
          <Form.Control
            type="text"
            name="headerImage"
            value={post.headerImage}
            onChange={handleChange}
          />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-4 mb-4" controlId="formTags">
         <Form.Label column sm="2">Tags</Form.Label>
         <Col sm="10">

          {tags.map((tag) => (
            <Form.Check
              custom
              key={tag.id}
              type="checkbox"
              id={`custom-checkbox-${tag.id}`}
              label={tag.name}
              value={tag.id}
              checked={selectedTags.includes(tag.id)}
              onChange={handleTagChange}
            />
          ))}
          </Col>
        </Form.Group>

        <Button bsPrefix="add-figure-button" className="me-2" type="submit">
          Update
        </Button>
        <Button
          variant="secondary"
          bsPrefix="cancel-figure-button"
          className="ml-2"
          onClick={() => navigate(`/post/${postId}`)}
        >
          Cancel
        </Button>
      </Form>
    </Container>
    </div>
  );
};

export default UpdatePostForm;
