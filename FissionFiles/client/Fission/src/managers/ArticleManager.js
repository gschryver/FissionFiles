import React, { useState, createContext } from "react";

export const ArticleContext = createContext();

const apiUrl = "https://localhost:5001/api/Article";

export const ArticleProvider = (props) => {
    const [articles, setArticles] = useState([]);

    const getAllArticles = () => {
        return fetch(apiUrl)
            .then((res) => res.json())
            .then(setArticles);
    };

    const getArticleById = (id) => {
        return fetch(`${apiUrl}/${id}`).then((res) => res.json());
    };

    const getArticleByUserId = (userId) => {
        return fetch(`${apiUrl}/user/${userId}`).then((res) => res.json());
    };

    const addArticle = (article) => {
        return fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article),
        }).then((res) => res.json());
    };

    const updateArticle = (article) => {
        return fetch(`${apiUrl}/Update/${article.id}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article),
        }).then((res) => res.json());
    };

    const deleteArticle = (articleId) => {
        return fetch(`${apiUrl}/Delete/${articleId}`, {
            method: "DELETE",
        }).then(getAllArticles);
    };

    return (
        <ArticleContext.Provider
            value={{
                articles,
                getAllArticles,
                getArticleById,
                getArticleByUserId,
                addArticle,
                updateArticle,
                deleteArticle,
            }}
        >
            {props.children}
        </ArticleContext.Provider>
    );
};
