import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { UserContext } from "../../managers/UserManager";
import { PostContext } from "../../managers/PostManager";
import { TagContext } from "../../managers/TagManager";
import { ForumContext } from "../../managers/ForumManager";
import { useNavigate } from "react-router-dom";

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
    const selectedOptions = Array.from(evt.target.selectedOptions);
    const selectedTagIds = selectedOptions.map((option) =>
      Number(option.value),
    );
    setNewPost({ ...newPost, selectedTags: selectedTagIds });
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
    <Container className="mt-4">
      <h2>Add New Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" id="title" onChange={handleFieldChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            id="content"
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Header Image</Form.Label>
          <Form.Control
            type="text"
            id="headerImage"
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Forum</Form.Label>
          <Form.Control as="select" id="forumId" onChange={handleForumChange}>
            <option value="">Select a forum</option>
            {forums.map((forum) => (
              <option key={forum.id} value={forum.id}>
                {forum.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Tags</Form.Label>
          <Form.Control
            as="select"
            multiple
            id="selectedTags"
            onChange={handleTagChange}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostForm;
