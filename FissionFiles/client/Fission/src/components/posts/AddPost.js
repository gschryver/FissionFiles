import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../managers/UserManager";
import { PostContext } from "../../managers/PostManager";
import { TagContext } from "../../managers/TagManager";
import { ForumContext } from "../../managers/ForumManager";
import { useNavigate } from "react-router-dom";
import NavBar from "../nav/navbar";

const NewPostForm = () => {
  const { user } = useContext(UserContext);
  const { addPost } = useContext(PostContext);
  const { forums, getAllForums } = useContext(ForumContext);
  const { tags, getAllTags, addTagsToPost } = useContext(TagContext);
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    userId: user?.id || null,
    forumId: null,
    title: "",
    content: "",
    headerImage: "",
    isDeleted: false,
    timestamp: new Date().toISOString(),
    selectedTags: [],
  });

  useEffect(() => {
    getAllForums();
    getAllTags();
  }, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...newPost };
    stateToChange[evt.target.id] = evt.target.value;
    setNewPost(stateToChange);
  };

  const handleForumChange = (evt) => {
    // updates the forumId when a forum is selected
    setNewPost({ ...newPost, forumId: evt.target.value });
  };

  const handleTagChange = (evt) => {
    const value = Number(evt.target.value);
    const isChecked = evt.target.checked;

    // If the checkbox is checked and the value isn't in the array, add it
    // Otherwise, if the checkbox is unchecked, remove the value from the array
    setNewPost((prevPost) => ({
      ...prevPost,
      selectedTags: isChecked
        ? [...prevPost.selectedTags, value]
        : prevPost.selectedTags.filter((tagId) => tagId !== value),
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    addPost(newPost)
      .then((createdPost) => {
        return addTagsToPost(createdPost.id, newPost.selectedTags);
      })
      .then(() => {
        navigate(`/forums/${newPost.forumId}/posts`);
      })
      .catch((err) => console.error("Error adding post: ", err));
  };

  return (
    <div className="add-post-page">
      <NavBar />
      <Container className="mt-4 add-general-form p-5">
        <h2 className="important-header">Add New Post</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                id="title"
                onChange={handleFieldChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Content
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                id="content"
                onChange={handleFieldChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Header Image
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                id="headerImage"
                onChange={handleFieldChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Forum
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                id="forumId"
                onChange={handleForumChange}
              >
                <option value="">Select a forum</option>
                {forums.map((forum) => (
                  <option key={forum.id} value={forum.id}>
                    {forum.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="2">
              Select Tags
            </Form.Label>
            <Col sm="10">
              {tags.map((tag) => (
                <Form.Check
                  key={tag.id}
                  type="checkbox"
                  label={tag.name}
                  value={tag.id}
                  onChange={handleTagChange}
                />
              ))}
            </Col>
          </Form.Group>

          <Button bsPrefix="add-figure-button" className="me-2" type="submit">
            Add
          </Button>
          <Button
  variant="secondary"
  bsPrefix="cancel-figure-button"
  className="ml-2"
  onClick={() => navigate(-1)}
>
  Cancel
</Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewPostForm;
