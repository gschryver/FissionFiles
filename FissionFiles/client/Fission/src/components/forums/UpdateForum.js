import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../../managers/PostManager';
import { ForumContext } from '../../managers/ForumManager';
import { UserContext } from '../../managers/UserManager';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NavBar from "../nav/navbar";


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
        <div class="add-general-page">
        <NavBar />
        <Container className="mt-4 add-general-form p-5">
        <h2 className="important-header">Update Forum</h2>
        <Form onSubmit={handleSubmit}>
              <Form.Group as={Row}>
               <Form.Label column sm="2">Name</Form.Label>
               <Col sm="10">
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </Col>
            </Form.Group>

              <Form.Group as={Row}>
               <Form.Label column sm="2" className="mb-4">Description</Form.Label>
               <Col sm="10">
                <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </Col>
            </Form.Group>

            <Button bsPrefix="add-figure-button" className="me-2" type="submit">
          Update
        </Button>
        <Button
          variant="secondary"
          bsPrefix="cancel-figure-button"
          className="ml-2"
          onClick={() => navigate(`/forums`)}
        >
          Cancel
        </Button>
        </Form>
    </Container>
    </div>
    );
}

export default UpdateForum;
