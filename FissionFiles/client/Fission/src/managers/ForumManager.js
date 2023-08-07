import React, { useState, createContext } from "react";

export const ForumContext = createContext();

const apiUrl = "https://localhost:5001/api/Forum";

export const ForumProvider = (props) => {
    const [forums, setForums] = useState([]);

    const getAllForums = () => {
        return fetch(apiUrl)
            .then((res) => res.json())
            .then(setForums);
    };

    const getForumById = (forumId) => {
        return fetch(`${apiUrl}/${forumId}`).then((res) => res.json());
    };

    const getPostByForumId = (forumId) => {
        return fetch(`${apiUrl}/${forumId}/posts`).then((res) => res.json());
    };

    return (
        <ForumContext.Provider
            value={{
                forums,
                getAllForums, 
                getForumById,
                getPostByForumId,     
            }}
        >
            {props.children}
        </ForumContext.Provider>
    );
}
