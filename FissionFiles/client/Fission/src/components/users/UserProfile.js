import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { UserContext } from '../../managers/UserManager';
import { PostContext } from '../../managers/PostManager';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, getUserById, deleteUser, banUser, logout } = useContext(UserContext);
  const { posts, getAllPosts } = useContext(PostContext);
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;
  
  
  useEffect(() => {
    getUserById(userId).then(setProfile);
    getAllPosts();
  }, [userId, getUserById]);

  const getPostTitleById = (postId) => {
    const post = posts.find(post => post.id === postId);
    return post ? post.title : 'Unknown Post';
  };

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

  const handleBan = () => {
    if (window.confirm("Are you sure you want to ban this user?")) {
      banUser(userId).then(() => navigate("/users"));
    }
  };
  
  return (
    <Container className="mt-4">
      <h1>Profile</h1>
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
              {isAdmin && (
                <div className="mt-2">
                <Button variant="danger" onClick={handleBan}>Ban User</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
              <div>
                <h3>Articles</h3>
                {profile.articles.length > 0 ? (
                  profile.articles.map((article, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <Card.Title>      
                          <Link to={`/article/${article.id}`}>{article.title}</Link>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{article.publicationDate}</Card.Subtitle>
                        <Card.Text>{article.content}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>This user has no articles.</p>
                )}
              </div>
            
          <div>
            <h3>Posts</h3>
            {profile.posts.length > 0 ? (
              profile.posts.map((post, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{post.timestamp}</Card.Subtitle>
                    <Card.Text>{post.content}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>This user has no posts.</p>
            )}
          </div>

          <div>
            <h3>Comments</h3>
            {profile.comments.length > 0 ? (
              profile.comments.map((comment, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/post/${comment.postId}`}>{getPostTitleById(comment.postId)}</Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{comment.timestamp}</Card.Subtitle>
                    <Card.Text>{comment.content}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>This user has no comments.</p>
            )}
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
