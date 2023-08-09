import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArticleContext } from '../../managers/ArticleManager';
import { UserContext } from '../../managers/UserManager';
import { Container, Card, Button, ButtonGroup } from 'react-bootstrap';

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
                        Author: {article.author} | Date: {new Date(article.publicationDate).toLocaleDateString()}
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
