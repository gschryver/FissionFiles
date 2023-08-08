import React, { useState, createContext } from "react";

export const CommentContext = createContext();

const apiUrl = "https://localhost:5001/api/Comment";

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);

    const getAllComments = () => {
        return fetch(apiUrl)
            .then((res) => res.json())
            .then(setComments);
    };

    const getCommentById = (commentId) => {
        return fetch(`${apiUrl}/${commentId}`).then((res) => res.json());
    };

    const getCommentsForPost = (postId) => {
        return fetch(`${apiUrl}/forPost/${postId}`).then((res) => res.json());
    };

    return (
        <CommentContext.Provider
            value={{
                comments,
                getAllComments,
                getCommentById,
                getCommentsForPost
            }}
        >
            {props.children}
        </CommentContext.Provider>
    )
}