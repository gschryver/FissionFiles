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

    const addComment = (comment) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }).then(getAllComments);
    };

    const updateComment = (comment) => {
        return fetch(`${apiUrl}/Update/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }).then(getAllComments);
    };

    // user can delete their own comment
    const deleteComment = (commentId) => {
        return fetch(`${apiUrl}/Delete/${commentId}`, {
            method: "DELETE",
        }).then(getAllComments);
    };

    // admin can remove comment
    const removeComment = (commentId) => {
        return fetch(`${apiUrl}/Remove/${commentId}`, {
            method: "DELETE",
        }).then(getAllComments);
    };

    return (
        <CommentContext.Provider
            value={{
                comments,
                getAllComments,
                getCommentById,
                getCommentsForPost,
                addComment,
                updateComment,
                deleteComment,
                removeComment,
            }}
        >
            {props.children}
        </CommentContext.Provider>
    )
}