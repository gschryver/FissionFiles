import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ArticleContext } from '../../managers/ArticleManager';
import { CategoryContext } from '../../managers/CategoryManager'; 
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../managers/UserManager";

const UpdateArticle = () => {
  const { getArticleById, updateArticle } = useContext(ArticleContext);
  const { articleId } = useParams();
  const { user } = useContext(UserContext);
  const { categories, assignCategoryToArticle, updateCategoryForArticle, getAllCategories } = useContext(CategoryContext); 
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

  if (!article) {
    return <p>Loading...</p>;
  }

  const isAdmin = user && user.userTypeId === 1;
  if (!isAdmin) {
    navigate("/not-authorized");
    return null;
  }

  return (
    <Container className="mt-4">
      <h2>Update Article</h2>
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

      <Form.Group controlId="imageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          value={article.imageUrl}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="categoryId">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            value={article.categoryId}
            onChange={handleChange}
          >
            <option value="" disabled>Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

      <Button type="submit">Update Article</Button>
    </Form>
    </Container>
  );
};

export default UpdateArticle;
