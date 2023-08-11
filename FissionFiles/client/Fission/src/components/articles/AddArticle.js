import React, { useContext, useState, useEffect } from "react";
import { ArticleContext } from '../../managers/ArticleManager';
import { UserContext } from "../../managers/UserManager";
import { CategoryContext } from "../../managers/CategoryManager";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    <Container className="mt-4">
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
        <Form.Group>
   <Form.Label>Category</Form.Label>
   <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))} required>
      <option value="" disabled>Select a category</option>
      {categories.map(category => (
         <option key={category.id} value={category.id}>{category.name}</option> 
      ))}
   </Form.Control>
</Form.Group>

        <Button variant="primary" type="submit">
          Create Article
        </Button>
      </Form>
    </Container>
  );
};

export default NewArticleForm;
