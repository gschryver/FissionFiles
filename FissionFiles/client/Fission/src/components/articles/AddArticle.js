import React, { useContext, useState } from "react";
import { ArticleContext } from '../../managers/ArticleManager';
import { UserContext } from "../../managers/UserManager";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewArticleForm = () => {
  const { addArticle } = useContext(ArticleContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("context:", useContext(ArticleContext))
  console.log("Current user:", user);
  console.log("Current user ID:", user?.id);


  const [article, setArticle] = useState({
    title: "",
    content: "",
    author: "",
    userId: user?.id || null,
    publicationDate: new Date().toISOString()
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addArticle(article).then(() => {
      setArticle({
        title: "",
        content: "",
        author: "",
        userId: user?.id || null,
        publicationDate: new Date().toISOString()
      });
        navigate("/articles");
    });
  };

  if (user && user.userTypeId !==1) {
    navigate("/not-authorized");
    return null;
  }

  return (
    <Container>
      <h2>Create a New Article</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={article.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            value={article.content}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={article.author}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Article
        </Button>
      </Form>
    </Container>
  );
};

export default NewArticleForm;
