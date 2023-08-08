import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { UserContext } from '../../managers/UserManager';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, getUserById, deleteUser, logout } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    getUserById(userId).then(setProfile);
  }, [userId, getUserById]);

  if (!profile) return <div>Loading...</div>;

  // delete profile 
  const handleDelete = () => {
    const confirmDelete = window.confirm('This cannot be undone. Are you sure you want to delete your account?');
    if (confirmDelete) {
      deleteUser(userId)
        .then(() => {
          logout(); 
          navigate('/login'); 
        })
        .catch(error => {
          console.error('Failed to delete user:', error);
        });
    }
  };
  
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={profile.avatar} alt="User Avatar" />
            <Card.Body>
              <Card.Title>{profile.displayName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{profile.userType.name}</Card.Subtitle>
              <Card.Text>{profile.bio}</Card.Text>
                {user.id === profile.id && (
                  <Link to={`/edit-profile/${userId}`}>
                      <Button variant="primary">Edit Profile</Button>
                  </Link>
                )}
              <Button variant="danger" onClick={handleDelete}>Delete Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h3>Articles</h3>
          {profile.articles.map((article, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{article.publicationDate}</Card.Subtitle>
                <Card.Text>{article.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          <h3>Posts</h3>
          {profile.posts.map((post, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.timestamp}</Card.Subtitle>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          <h3>Comments</h3>
          {profile.comments.map((comment, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{comment.content}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{comment.timestamp}</Card.Subtitle>
                <Card.Text>{comment.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
