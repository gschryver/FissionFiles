import React, { useState, createContext } from "react";

export const PostContext = createContext();

const apiUrl = "https://localhost:5001/api/Post";

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {
        return fetch(apiUrl)
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPostById = (id) => {
        return fetch(`${apiUrl}/${id}`).then((res) => res.json());
    };

    const addPost = (post) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        }).then((res) => res.json());
    };

    const updatePost = (post) => {
        return fetch(`${apiUrl}/Update/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        }).then((res) => res.json());
    };

    const deletePost = (postId) => {
        return fetch(`${apiUrl}/Delete/${postId}`, {
            method: "DELETE",
        }).then(getAllPosts);
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                getAllPosts,
                getPostById,
                addPost,
                updatePost,
                deletePost
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}
