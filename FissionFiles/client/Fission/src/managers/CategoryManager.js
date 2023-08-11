import React, { useState, createContext } from 'react';

export const CategoryContext = createContext();

const apiUrl = "https://localhost:5001/api/Category";

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [articlesByCategory, setArticlesByCategory] = useState([]);

    const getAllCategories = () => {
        return fetch(apiUrl)
            .then(res => res.json())
            .then(setCategories);
    };

    const getCategoryById = (categoryId) => {
        return fetch(`${apiUrl}/${categoryId}`)
            .then(res => res.json())
            .then(setSelectedCategory);
    };

    const addCategory = (category) => {
        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(getAllCategories);
    };

    const updateCategory = (category) => {
        return fetch(`${apiUrl}/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(getAllCategories);
    };

    const deleteCategory = (categoryId) => {
        return fetch(`${apiUrl}/${categoryId}`, {
            method: 'DELETE',
        })
        .then(getAllCategories);
    };

    const getArticlesByCategory = (categoryId) => {
        return fetch(`${apiUrl}/articles/${categoryId}`)
            .then(res => res.json())
            .then(setArticlesByCategory);
    };

    const assignCategoryToArticle = (articleId, categoryId) => {
        return fetch(`${apiUrl}/assign?articleId=${articleId}&categoryId=${categoryId}`, {
            method: 'POST',
        });
    };

    const updateCategoryForArticle = (articleId, newCategoryId) => {
        return fetch(`${apiUrl}/update/${articleId}/${newCategoryId}`, {
            method: 'PUT',
        });
    };

    const deleteCategoryForArticle = (articleId) => {
        return fetch(`${apiUrl}/delete/${articleId}`, {
            method: 'DELETE',
        });
    };

    return (
        <CategoryContext.Provider value={{
            categories,
            selectedCategory,
            articlesByCategory,
            getAllCategories,
            getCategoryById,
            addCategory,
            updateCategory,
            deleteCategory,
            getArticlesByCategory,
            assignCategoryToArticle,
            updateCategoryForArticle,
            deleteCategoryForArticle
        }}>
            {props.children}
        </CategoryContext.Provider>
    );
}
