import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CategoryContext } from "../../managers/CategoryManager";
import { UserContext } from "../../managers/UserManager";
import { ArticleContext } from "../../managers/ArticleManager";
import { Container, Table, Button, ListGroup } from "react-bootstrap";

const CategoryList = () => {
  const {
    categories,
    getAllCategories,
    deleteCategoryForArticle,
    getArticlesByCategory,
    articlesByCategory,
    deleteCategory,
  } = useContext(CategoryContext);
  const { user } = useContext(UserContext);
  const { articles } = useContext(ArticleContext);
  const navigate = useNavigate();
  const [articlesByCategoryId, setArticlesByCategoryId] = useState({});
  const isAdmin = user && user.userTypeId === 1;

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    categories.forEach((category) => {
      getArticlesByCategory(category.id).then((articles) => {
        setArticlesByCategoryId((prevState) => ({
          ...prevState,
          [category.id]: articles,
        }));
      });
    });
  }, [categories]);

  const handleDelete = (categoryId) => {
    if (
      window.confirm(
        "WARNING:\n\n Are you sure you want to delete this category? This cannot be undone.",
      )
    ) {
      const articlesForCategory = articlesByCategoryId[categoryId];
  
      // if there are articles for this category, delete category for each article first
      const deletionPromises = articlesForCategory && Array.isArray(articlesForCategory)
        ? articlesForCategory.map((article) => deleteCategoryForArticle(article.id))
        : [];
  
      // once category has been deleted for all articles (or if there were no articles), delete the category
      Promise.all(deletionPromises).then(() => {
        deleteCategory(categoryId).then(() => {
          getAllCategories();
        });
      });
    }
  };
  
  return (
    <Container className="mt-4">
      <h1>Manage Categories</h1>
      {isAdmin && (
        <Button
          variant="secondary"
          className="mb-3"
          onClick={() => navigate("/categories/add")}
        >
          Add New Category
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Articles</th>
            <th>Category Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <ListGroup variant="flush">
                  {articlesByCategory[category.id] &&
                  articlesByCategory[category.id].length > 0 ? (
                    articlesByCategory[category.id].map((article) => (
                      <p key={article.id}>
                        <Link to={`/article/${article.id}`}>
                          {article.title}
                        </Link>
                      </p>
                    ))
                  ) : (
                    <p>No articles for this category.</p>
                  )}
                </ListGroup>
              </td>
              <td>{category.description}</td>
              <td>
                {isAdmin && (
                  <>
                    <Button
                      as={Link}
                      to={`/categories/${category.id}/edit`}
                      variant="primary"
                    >
                      Edit
                    </Button>
                    &nbsp; | &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CategoryList;
