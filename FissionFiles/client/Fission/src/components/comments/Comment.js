import React, { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Comment = ({ comment, user, isAdmin, handleUpdate, handleDelete, handleRemove, handleBan }) => {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContentState] = useState("");

  const handleEdit = () => {
    setEditing(true);
    setEditedContentState(comment.content);
  };

  const saveEdit = () => {
    handleUpdate(comment.id, editedContent);
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <ListGroup.Item>
      <strong>
        {comment.isDeleted || comment.isRemoved ? (
          "[deleted]"
        ) : (
          <Link to={`/user/${comment.userId}`}>
            {comment.user.displayName}
          </Link>
        )}{" "}
        <small>{new Date(comment.timestamp).toLocaleDateString()}</small>
      </strong>

      {comment.isRemoved ? (
        <p>[This comment was removed for violating community policy.]</p>
      ) : comment.isDeleted || !editing ? (
        <p>{comment.content}</p>
      ) : (
        <div>
          <Form.Control
            as="textarea"
            value={editedContent}
            onChange={(e) => {
                setEditedContentState(e.target.value);
              }}
          />
          <Button variant="link" onClick={saveEdit}>
            Save
          </Button>
          <Button variant="link" onClick={cancelEdit}>
            Cancel
          </Button>
        </div>
      )}

      {comment.userId === user.id && !editing && (
        <>
          <Button bsPrefix="edit-button me-2" onClick={handleEdit}>
            Edit
          </Button>
          <Button bsPrefix="delete-button me-2" onClick={() => handleDelete(comment.id)}>
            Delete
          </Button>
        </>
      )}

      {isAdmin && !editing && (
        <>
          <Button bsPrefix="deactivate-button me-2" onClick={() => handleRemove(comment.id)}>
            Remove
          </Button>
          <Button bsPrefix="deactivate-button me-2" onClick={() => handleBan(comment.userId)}>
            Ban User
          </Button>
        </>
      )}
    </ListGroup.Item>
  );
};

export default Comment;
