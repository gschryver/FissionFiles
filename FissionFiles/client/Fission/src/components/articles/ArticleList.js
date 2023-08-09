import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArticleContext } from '../../managers/ArticleManager';
import { Container, Table } from 'react-bootstrap';

const ArticleList = () => {
    const { articles, getAllArticles } = useContext(ArticleContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllArticles();
    }, []);

    return (
        <Container className="mt-4 article-list-container">
            <h1>Articles</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        {/* 
                        <th>Edit</th>
                        <th>Delete</th>
                        */}
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td><Link to={`/article/${article.id}`}>{article.title}</Link></td>
                            <td>{article.author}</td>
                            <td>{new Date(article.publicationDate).toLocaleDateString()}</td>
                            {/* 
                            <td><button onClick={() => navigate(`/article/edit/${article.id}`)}>Edit</button></td>
                            <td><button>Delete</button></td>
                            */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ArticleList;
