import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArticleContext } from '../../managers/ArticleManager';
import { UserContext } from '../../managers/UserManager';
import { CategoryContext } from '../../managers/CategoryManager';
import { Container, Card, Button, ButtonGroup, Badge } from 'react-bootstrap';

const Article = () => {
    const { getArticleById, deleteArticle } = useContext(ArticleContext);
    const { user } = useContext(UserContext);
    const { categories, getCategoryById } = useContext(CategoryContext);
    const [articleCategory, setArticleCategory] = useState(null);
    const { articleId } = useParams(); 
    const [article, setArticle] = useState(null); 
    const navigate = useNavigate();
    const isAdmin = user && user.userTypeId === 1;
    const { articles, getAllArticles } = useContext(ArticleContext);

useEffect(() => {
    getAllArticles();
}, []);


    useEffect(() => {
        getArticleById(articleId)
            .then(fetchedArticle => {
                console.log("Fetched Article:", fetchedArticle);
                setArticle(fetchedArticle);
                if (fetchedArticle.categoryId) {
                    return getCategoryById(fetchedArticle.categoryId);
                } else {
                    return Promise.resolve(null);
                }
            })
            .then(fetchedCategory => {
                console.log("Fetched Category:", fetchedCategory);
                setArticleCategory(fetchedCategory);
            });
    }, [articleId]);

    if (!article) {
        return <p>Loading...</p>; 
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this article? This cannot be undone.")) {
            deleteArticle(article.id)
                .then(() => {
                    console.log("Article deleted successfully");
                    navigate("/articles");
                })
                .catch((error) => {
                    console.error("Error deleting the article:", error);
                });
        }
    };
    

    
    return (
        <Container className="mt-4 article-container">
            <Card>
                <Card.Header as="h1">{article.title}</Card.Header>
                <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                    Author: {article.author} | Date: {new Date(article.publicationDate).toLocaleDateString()} | 
                    Category: {articleCategory && <Badge variant="info" className="ml-2">{articleCategory.name}</Badge>}
                    {!articleCategory && article.categoryId === null && <Badge variant="secondary" className="ml-2">No Category</Badge>}
             </Card.Subtitle>
                    <Card.Text className="mt-4 article-content">
                        {article.content}
                    </Card.Text>
                    {isAdmin && (
                        <ButtonGroup className="mt-3">
                            <Button variant="primary" onClick={() => navigate(`/articles/edit/${article.id}`)}>Edit</Button>
                            <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        </ButtonGroup>
                    )}
                </Card.Body>
            </Card>
            <Button className="mt-3" variant="secondary" as={Link} to="/articles">Back to Articles List</Button>
        </Container>
    );
}

export default Article;
