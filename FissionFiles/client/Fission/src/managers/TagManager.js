import React, { useState, createContext } from 'react';

export const TagContext = createContext();

const apiUrl = "https://localhost:5001/api/Tag";

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);

   const getAllTags = () => {
        return fetch(`${apiUrl}`)
            .then(res => res.json())
            .then(setTags)
    }
    
    const getTagById = (id) => {
        return fetch(`${apiUrl}/${id}`)
            .then(res => res.json())
    }

    const getPostsByTagId = (id) => {
        return fetch(`${apiUrl}/${id}/posts`)
            .then(res => res.json());
    }

    const getTagsForPost = (id) => {
        return fetch(`${apiUrl}/${id}/tags`)
            .then(res => res.json());
    }

    const addTag = (tag) => {
        return fetch(`${apiUrl}/Add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(res => res.json())
    }

    const updateTag = (tag) => {
        return fetch(`${apiUrl}/Update/${tag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
    }

    const deleteTag = (id) => {
        return fetch(`${apiUrl}/Delete/${id}`, {
            method: "DELETE"
        }).then(getAllTags)
    }


    return (
        <TagContext.Provider value={{
            tags,
            getAllTags,
            getTagById,
            getTagsForPost,
            getPostsByTagId,
            addTag,
            updateTag,
            deleteTag,
        }}>
            {props.children}
        </TagContext.Provider>
    );
}
