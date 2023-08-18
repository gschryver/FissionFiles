import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap'; 
import { CategoryContext } from '../../managers/CategoryManager';
import { UserContext } from '../../managers/UserManager';
import NavBar from '../nav/navbar';

const CategoryArticleList = () => {
    const { getArticlesByCategory, getCategoryById, articlesByCategory } = useContext(CategoryContext); 
    const { user } = useContext(UserContext);
    const { categoryId } = useParams();
    const [articles, setArticles] = useState([]);
    const [categoryName, setCategoryName] = useState(''); 
    const isAdmin = user && user.userTypeId === 1;
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryById(categoryId).then(category => {
            console.log(category);
            setCategoryName(category.name);
        });
    
        getArticlesByCategory(categoryId).then(setArticles);
    }, [categoryId]);
    

    const articlesForThisCategory = articlesByCategory[categoryId] || [];

    return (
        <div className="location-list-page">
        <NavBar />
        <Container className="general-list-container">
            <h1 className="important-header mb-3">{categoryName}</h1>
            {isAdmin && (
        <Button
        variant="secondary"
        bsPrefix="add-figure-button"
          onClick={() => navigate("/articles/add")}
          >
          Add New Article
        </Button>
      )}
            <Table className="opaque-table mt-3"> 
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {articlesForThisCategory.map((article, index) => (
                        <tr key={article.id}>
                            <td><Link to={`/article/${article.id}`}>{article.title}</Link></td>
                            <td>{article.author}</td>
                            <td>{new Date(article.publicationDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </div>
    );
}

export default CategoryArticleList;
