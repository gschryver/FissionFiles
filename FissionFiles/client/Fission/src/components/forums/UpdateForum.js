import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../../managers/PostManager';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { Form, Button } from 'react-bootstrap';

const UpdateForum = () => {
    const { forumId } = useParams();
    const navigate = useNavigate();

    const { getForumById, updateForum } = useContext(ForumContext);
    const { user } = useContext(UserContext);

    const [forum, setForum] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        getForumById(forumId)
            .then(fetchedForum => {
                if (fetchedForum) {
                    setForum(fetchedForum);
                    setName(fetchedForum.name);
                    setDescription(fetchedForum.description);
                }
            });
    }, [forumId, getForumById]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedForum = {
            ...forum,
            name,
            description,
            userId: user?.id || null 
        };

        updateForum(updatedForum)
            .then(() => {
                navigate(`/forums`); 
            });
    };

    if (user && user.userTypeId !==1) {
        navigate("/not-authorized");
        return null;
      }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update Forum
            </Button>
        </Form>
    );
}

export default UpdateForum;
