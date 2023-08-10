import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';
import { Link } from 'react-router-dom';
import { ArticleContext } from '../../managers/ArticleManager';
import { Container, Table, Button } from 'react-bootstrap';

const ArticleList = () => {
    const { articles, getAllArticles, deleteArticle } = useContext(ArticleContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        getAllArticles();
    }, []);

    // delete article 
    const handleDelete = (articleId) => {
        if(window.confirm("WARNING:\n\nAre you sure you want to delete this article? This cannot be undone.")) {
        deleteArticle(articleId);
    }}


    return (
        <Container className="mt-4 article-list-container">
            <h1>Articles</h1>
            {isAdmin && (
            <Button className="mb-3" variant="secondary" as={Link} to={`/articles/add`}>Add Article</Button>)}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td><Link to={`/article/${article.id}`}>{article.title}</Link></td>
                            <td>{article.author}</td>
                            <td>{new Date(article.publicationDate).toLocaleDateString()}</td>
                            <td><Button onClick={() => navigate(`/articles/edit/${article.id}`)}>Edit</Button>
                            &nbsp; | &nbsp;
                            <Button variant="danger" onClick={() => handleDelete(article.id)}>Delete</Button>
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ArticleList;
