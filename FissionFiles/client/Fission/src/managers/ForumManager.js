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

    const addForum = (forum) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(forum),
        }).then(getAllForums);
    };

    const updateForum = (forum) => {
        return fetch(`${apiUrl}/Update/${forum.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(forum),
        }).then(getAllForums);
    };

    const deleteForum = (forumId) => {
        return fetch(`${apiUrl}/Delete/${forumId}`, {
            method: "DELETE",
        }).then(getAllForums);
    };   

    const deactivateForum = (forumId) => {
        return fetch(`${apiUrl}/Deactivate/${forumId}`, {
            method: "PUT",
        }).then(getAllForums);
    };
    
    const reactivateForum = (forumId) => {
        return fetch(`${apiUrl}/Reactivate/${forumId}`, {
            method: "PUT",
        }).then(getAllForums);
    };
    

    return (
        <ForumContext.Provider
            value={{
                forums,
                getAllForums, 
                getForumById,
                getPostByForumId,
                addForum, 
                deleteForum,
                updateForum,
                deactivateForum,
                reactivateForum, 
            }}
        >
            {props.children}
        </ForumContext.Provider>
    );
}
