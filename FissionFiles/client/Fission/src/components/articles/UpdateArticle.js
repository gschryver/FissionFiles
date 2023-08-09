import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ArticleContext } from '../../managers/ArticleManager';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../managers/UserManager";

const UpdateArticle = () => {
  const { getArticleById, updateArticle } = useContext(ArticleContext);
  const { articleId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    userId: user?.id || "", 
    title: "",
    content: "",
    author: "",
    publicationDate: ""
  });

  useEffect(() => {
    getArticleById(articleId)
      .then((data) => {
        console.log("Fetched article data:", data); 
        setArticle(data);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });
  }, [articleId, getArticleById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateArticle(article).then(() => {
      console.log("Article updated successfully!");
      navigate(`/article/${articleId}`);
    });
  };

  if (!article) {
    return <p>Loading...</p>;
  }

 const isAdmin = user && user.userTypeId === 1;
    if (!isAdmin) {
        navigate("/not-authorized");
        return null;
    }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={article.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={article.content}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={article.author}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="publicationDate">
        <Form.Label>Publication Date</Form.Label>
        <Form.Control
          type="date"
          name="publicationDate"
          value={article.publicationDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Update Article</Button>
    </Form>
  );
};

export default UpdateArticle;
