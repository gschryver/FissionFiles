import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ArticleContext } from '../../managers/ArticleManager';
import { CategoryContext } from '../../managers/CategoryManager'; 
import { UserContext } from "../../managers/UserManager";
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import NavBar from '../nav/navbar';
import '../css/article.css';

const UpdateArticle = () => {
  const { getArticleById, updateArticle } = useContext(ArticleContext);
  const { articleId } = useParams();
  const { user } = useContext(UserContext);
  const { categories, updateCategoryForArticle, getAllCategories } = useContext(CategoryContext); 
  const navigate = useNavigate();
  
  const [article, setArticle] = useState({
    userId: user?.id || "", 
    title: "",
    content: "",
    author: "",
    publicationDate: "",
    imageUrl: "",
    categoryId: null, 
  });

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    getArticleById(articleId).then((data) => {
        setArticle(data);
    }).catch((error) => {
        console.error("Error fetching article:", error);
    });
  }, [articleId, getArticleById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateArticle(article).then(() => {
      console.log("Article updated successfully!");

      if (article.categoryId) {
        updateCategoryForArticle(articleId, article.categoryId).then(() => {
          console.log("Category for article updated successfully!");
          navigate(`/article/${articleId}`);
        });
      } else {
        navigate(`/article/${articleId}`);
      }
    });
  };

  const isAdmin = user && user.userTypeId === 1;

  if (!isAdmin) {
    navigate("/not-authorized");
    return null;
  }

  return (
    <div className="add-scientist-page">
      <NavBar />
      <Container className="mt-4 add-scientist-form p-5">
        <h2 className="important-header">Update Article</h2>
        <Form onSubmit={handleSubmit}>

          <Form.Group as={Row} controlId="title">
            <Form.Label column sm="2">Title</Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter title" value={article.title} name="title" onChange={handleChange} required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="author">
            <Form.Label column sm="2">Author</Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter author name" value={article.author} name="author" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="content">
            <Form.Label column sm="2">Content</Form.Label>
            <Col sm="10">
              <Form.Control as="textarea" rows={3} placeholder="Enter content" value={article.content} name="content" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="imageUrl">
            <Form.Label column sm="2">Image URL</Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter image URL" value={article.imageUrl} name="imageUrl" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="categoryId">
            <Form.Label column sm="2">Category</Form.Label>
            <Col sm="10">
              <Form.Control as="select" name="categoryId" value={article.categoryId} onChange={handleChange} className="mb-4">
                <option value="" disabled>Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Button bsPrefix="add-figure-button" className="me-2" type="submit">
            Update
          </Button>
          <Button variant="secondary" bsPrefix="cancel-figure-button" className="ml-2" onClick={() => navigate("/articles")}>
            Cancel
          </Button>

        </Form>
      </Container>
    </div>
  );
};

export default UpdateArticle;
