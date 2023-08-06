import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArticleContext } from '../../managers/ArticleManager';
import { UserContext } from '../../managers/UserManager';

const Article = () => {
    const { getArticleById, deleteArticle } = useContext(ArticleContext);
    const { user } = useContext(UserContext);
    const { articleId } = useParams(); 
    const [article, setArticle] = useState(null); 
    const navigate = useNavigate();
    const isAdmin = user && user.userTypeId === 1;

    useEffect(() => {
        
        getArticleById(articleId)
            .then(fetchedArticle => {
                console.log("Fetched article", fetchedArticle)
                setArticle(fetchedArticle);
            });
    }, [articleId]);

    if (!article) {
        return <p>Loading...</p>; 
    }


    // delete article 
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this article? This cannot be undone.")) {
            deleteArticle(article.id)
                .then(() => {
                    console.log("Article deleted successfully");
                    navigate("/articles"); // Redirect to the articles list
                })
                .catch((error) => {
                    console.error("Error deleting the article:", error);
                });
        }
    };
    

    return (
        <div className="article-container">
            <h1>{article.title}</h1>
            <p>Author: {article.author}</p>
            <p>Date: {new Date(article.publicationDate).toLocaleDateString()}</p>
            <div className="article-content">
                {article.content}
            </div>
            
            {isAdmin && (
                <>
            <button onClick={() => navigate(`/articles/edit/${article.id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </>
            )}
            <Link to="/articles">Back to Articles List</Link>
        </div>
    );
}

export default Article;
