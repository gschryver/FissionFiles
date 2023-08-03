import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';
import { UserContext } from '../../managers/UserManager';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { getUserById } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    getUserById(userId).then(setProfile);
  }, [userId, getUserById]);

  if (!profile) return <div>Loading...</div>;

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
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
