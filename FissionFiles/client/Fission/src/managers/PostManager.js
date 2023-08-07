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


    return (
        <PostContext.Provider
            value={{
                posts,
                getAllPosts,
                getPostById,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}
