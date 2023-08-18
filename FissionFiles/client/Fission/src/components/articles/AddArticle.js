import React, { useContext, useState, useEffect } from "react";
import { ArticleContext } from '../../managers/ArticleManager';
import { UserContext } from "../../managers/UserManager";
import { CategoryContext } from "../../managers/CategoryManager";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../nav/navbar";

const NewArticleForm = () => {
  const { addArticle } = useContext(ArticleContext);
  const { user } = useContext(UserContext);
  const { categories, getAllCategories, assignCategoryToArticle } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories();
  }, []);

  const [article, setArticle] = useState({
    title: "",
    content: "",
    author: "",
    userId: user?.id || null,
    publicationDate: new Date().toISOString(),
    categoryId: null,
    imageUrl: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = Number(e.target.value);
    setSelectedCategory(categoryId === 0 ? "" : categoryId);
    setArticle((prevArticle) => ({
      ...prevArticle,
      categoryId: categoryId === 0 ? null : categoryId,
    }));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("article to add:", article)
    addArticle(article)
      .then((newArticle) => {
        console.log("New article:", newArticle);
  
        if (selectedCategory) {
          console.log("Selected category:", selectedCategory);
          assignCategoryToArticle(newArticle.id, parseInt(selectedCategory))
            .then(() => {
              console.log("Category assigned successfully");
              setArticle({
                title: "",
                content: "",
                author: "",
                userId: user?.id || null,
                publicationDate: new Date().toISOString(),
                categoryId: parseInt(selectedCategory),
                imageUrl: "",
              });
              setSelectedCategory(null);
              navigate("/articles");
            })
            .catch((error) => {
              console.error("Error assigning category:", error);
            });
        } else {
          setArticle({
            title: "",
            content: "",
            author: "",
            userId: user?.id || null,
            publicationDate: new Date().toISOString(),
            categoryId: null,
            imageUrl: "",
          });
          navigate("/articles");
        }
      })
      .catch((error) => {
        console.error("Error adding article:", error);
      });
  };
  

  if (user && user.userTypeId !== 1) {
    navigate("/not-authorized");
    return null;
  }

  return (
    <div className="add-article-page">
      <NavBar />
    <Container className="mt-4 add-article-form p-5">
        <h2 className="important-header">Create a New Article</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
            <Form.Label column sm="2">Title</Form.Label>
            <Col sm="10">
            <Form.Control 
              type="text" 
              name="title"
              id="title"
              value={article.title}
              onChange={handleInputChange}
              required 
            />
            </Col>

          </Form.Group>

          <Form.Group as={Row}>
          <Form.Label column sm="2">Content</Form.Label>
            <Col sm="10">
            <Form.Control 
              as="textarea" 
              rows={3} 
              id="content"
              name="content"
              value={article.content}
              onChange={handleInputChange}
              required 
            />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
          <Form.Label column sm="2">Author</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              id="author"
              name="author"
              value={article.author}
              onChange={handleInputChange}
              required
            />
            </Col>
          </Form.Group>


          <Form.Group as={Row} >
          <Form.Label column sm="2">Image URL</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={article.imageUrl}
              onChange={handleInputChange}
              required
            />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Category</Form.Label>
          <Col sm="10">
            <Form.Control 
              as="select" 
              id="categoryId"
              name="categoryId"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="0">Select a Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
            </Col>
          </Form.Group>

          <Button bsPrefix="add-figure-button" className="me-2" type="submit">
            Create Article
          </Button>
          <Button bsPrefix="cancel-figure-button" className="ml-2" onClick={() => navigate("/articles")}>
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewArticleForm;
