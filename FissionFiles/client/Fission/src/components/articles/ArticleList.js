import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../managers/UserManager";
import { CategoryContext } from "../../managers/CategoryManager";
import { Link } from "react-router-dom";
import { ArticleContext } from "../../managers/ArticleManager";
import { Container, Table, Button } from "react-bootstrap";

const ArticleList = () => {
  const { articles, getAllArticles, deleteArticle } =
    useContext(ArticleContext);
  const {
    categories,
    articlesByCategory,
    getArticlesByCategory,
    getAllCategories,
  } = useContext(CategoryContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;
  const [articlesByCat, setArticlesByCat] = useState({});

  useEffect(() => {
    getAllCategories();
    getAllArticles();
  }, []);

  useEffect(() => {
    categories.forEach((category) => {
      getArticlesByCategory(category.id).then((articles) => {
        setArticlesByCat((prevState) => ({
          ...prevState,
          [category.id]: articles,
        }));
      });
    });
  }, [categories]);

  // delete article
  const handleDelete = (articleId) => {
    if (
        window.confirm(
            "WARNING:\n\nAre you sure you want to delete this article? This cannot be undone.",
        )
    ) {
        deleteArticle(articleId).then(() => {
            getAllArticles();  // Refetch all articles
            getAllCategories(); // Refetch categories which will trigger articles by category refetch
        });
    }
};


  return (
    <Container className="mt-4 article-list-container">
      <h1>Articles</h1>
      {isAdmin && (
        <Button
          className="mb-3"
          variant="secondary"
          as={Link}
          to={`/articles/add`}
        >
          Add Article
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Category</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {Object.values(articlesByCategory)
            .flat()
            .map((article) => (
              <tr key={article.id}>
                <td>
                  <Link to={`/article/${article.id}`}>{article.title}</Link>
                </td>
                <td>{article.author}</td>
                <td>
                  {new Date(article.publicationDate).toLocaleDateString()}
                </td>
                <td>
                  {(
                    categories.find((cat) => cat.id === article.categoryId) ||
                    {}
                  ).name || "N/A"}
                </td>
                {isAdmin && (
                <td>
                  <Button
                    onClick={() => navigate(`/articles/edit/${article.id}`)}
                  >
                    Edit
                  </Button>
                  &nbsp; | &nbsp;
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </Button>
                </td>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ArticleList;
