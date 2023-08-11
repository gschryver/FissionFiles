import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TagContext } from "../../managers/TagManager";
import { UserContext } from "../../managers/UserManager";
import { Container, Table, Button, ListGroup } from "react-bootstrap";

const TagList = () => {
  const { tags, getAllTags, deleteTag, getPostsByTagId, removeTagFromPost } =
    useContext(TagContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;
  const [postsByTag, setPostsByTag] = useState({});

  useEffect(() => {
    getAllTags();
  }, []);

  useEffect(() => {
    tags.forEach((tag) => {
      getPostsByTagId(tag.id).then((posts) => {
        setPostsByTag((prevState) => ({
          ...prevState,
          [tag.id]: posts,
        }));
      });
    });
  }, [tags]);

  const handleDelete = (tagId) => {
    if (
      window.confirm(
        "WARNING:\n\n Are you sure you want to delete this tag? This cannot be undone.",
      )
    ) {
      // use promise.all to wait for all tag removal promises to resolve
      Promise.all(
        // map through each post associated with the tag
        postsByTag[tagId].map((post) => removeTagFromPost(post.id, tagId)),
      ).then(() => {
        // once all tag removal promises are resolved, proceed to delete the tag
        deleteTag(tagId).then(() => {
          // after the tag is deleted, refresh the tag list
          getAllTags();
        });
      });
    }
  };

  return (
    <Container className="mt-4">
      <h1>Manage Tags</h1>
      {isAdmin && (
        <Button
          variant="secondary"
          className="mb-3"
          onClick={() => navigate("/tags/add")}
        >
          Add New Tag
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tag Name</th>
            <th>Tag Description</th>
            <th>Posts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.name}</td>
              <td>{tag.description}</td>
              <td>
                <ListGroup variant="flush">
                  {postsByTag[tag.id] &&
                    postsByTag[tag.id]
                      .filter((post) => !post.isDeleted)
                      .map((post) => (
                        <p key={post.id}>
                          <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </p>
                      ))}
                </ListGroup>
              </td>
              <td>
                {isAdmin && (
                    <>
                    <Button as={Link} to={`/tags/${tag.id}/edit`} variant="primary">
                  Edit 
              </Button>
                &nbsp; | &nbsp;
                    <Button variant="danger" onClick={() => handleDelete(tag.id)}>
                        Delete
                    </Button>        
                </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TagList;