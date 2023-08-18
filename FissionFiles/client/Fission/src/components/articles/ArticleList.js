import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';
import { CategoryContext } from '../../managers/CategoryManager';
import { ArticleContext } from '../../managers/ArticleManager';
import { Container, Table, Button } from 'react-bootstrap';
import NavBar from '../nav/navbar';
import '../css/table.css';
import '../css/article.css';

const ArticleList = () => {
  const { articles, getAllArticles, deleteArticle } = useContext(ArticleContext);
  const { categories } = useContext(CategoryContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isAdmin = user && user.userTypeId === 1;

  useEffect(() => {
    getAllArticles();
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = (articleId) => {
    if (window.confirm("WARNING:\n\nAre you sure you want to delete this article? This cannot be undone.")) {
        deleteArticle(articleId).then(() => {
            getAllArticles();
        });
    }
  }

  return (
    <div className="article-list-page">
      <NavBar />
      <Container className="article-list-container">
        <h1 className="important-header mb-3">Articles</h1>
        {isAdmin && (
          <Button bsPrefix="add-figure-button" variant="secondary" as={Link} to={`/articles/add`}>Add Article</Button>
        )}
        <Table className="opaque-table mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Category</th>
              {isAdmin && <th>Admin Actions</th>}
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>
                  <Link to={`/article/${article.id}`}>{article.title}</Link>
                </td>
                <td>{article.author}</td>
                <td>{new Date(article.publicationDate).toLocaleDateString()}</td>
                <td>
                  {(categories.find(cat => cat.id === article.categoryId) || {}).name || "N/A"}
                </td>
                {isAdmin && (
                  <td>
                    <Button bsPrefix="edit-button" onClick={() => navigate(`/articles/edit/${article.id}`)}>Edit</Button>
                    &nbsp;&nbsp;
                    <Button bsPrefix="delete-button" onClick={() => handleDelete(article.id)}>Delete</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ArticleList;
