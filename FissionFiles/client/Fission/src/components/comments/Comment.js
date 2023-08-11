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
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(comment.id)}>
            Delete
          </Button>
        </>
      )}

      {isAdmin && !editing && (
        <>
          <Button variant="warning" onClick={() => handleRemove(comment.id)}>
            Remove
          </Button>
          <Button variant="danger" onClick={() => handleBan(comment.userId)}>
            Ban User
          </Button>
        </>
      )}
    </ListGroup.Item>
  );
};

export default Comment;
