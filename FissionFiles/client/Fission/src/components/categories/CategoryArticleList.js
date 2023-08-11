import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap'; 
import { CategoryContext } from '../../managers/CategoryManager';

const CategoryArticleList = () => {
    const { getArticlesByCategory, getCategoryById, articlesByCategory } = useContext(CategoryContext); 
    const { categoryId } = useParams();
    const [articles, setArticles] = useState([]);
    const [categoryName, setCategoryName] = useState(''); 

    useEffect(() => {
        getCategoryById(categoryId).then(category => {
            console.log(category);
            setCategoryName(category.name);
        });
    
        getArticlesByCategory(categoryId).then(setArticles);
    }, [categoryId]);
    

    const articlesForThisCategory = articlesByCategory[categoryId] || [];

    return (
        <Container className="mt-4">
            <h2>Articles in Category: {categoryName}</h2>
            
            <Table striped bordered hover> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Article Title</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {articlesForThisCategory.map((article, index) => (
                        <tr key={article.id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/article/${article.id}`}>{article.title}</Link></td>
                            <td>{article.author}</td>
                            <td>{new Date(article.publicationDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default CategoryArticleList;
