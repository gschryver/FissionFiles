import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArticleContext } from '../../managers/ArticleManager';

const ArticleList = () => {
    const { articles, getAllArticles } = useContext(ArticleContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllArticles();
    }, []);

    return (
        <div className="article-list-container">
            <h1>Articles</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                        <p>Author: {article.author}</p>
                        <p>Date: {new Date(article.publicationDate).toLocaleDateString()}</p>
                        {/* <button onClick={() => navigate(`/article/edit/${article.id}`)}>Edit</button> */}
                        {/* <button>Delete</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;
