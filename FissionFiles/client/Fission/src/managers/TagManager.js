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

    const addTagsToPost = (postId, tagIds) => {
        return fetch(`${apiUrl}/${postId}/tags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tagIds)
        })
        .then(res => {
          if (res.ok) {
            return Promise.resolve();
          } else {
            return Promise.reject("Tags could not be added to the post");
          }
        });
      }
       
      const removeTagFromPost = (postId, tagId) => {
        return fetch(`${apiUrl}/RemoveFromPost/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tagId)
        }).then(getAllTags);
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
            addTagsToPost,
            removeTagFromPost,
            updateTag,
            deleteTag,
        }}>
            {props.children}
        </TagContext.Provider>
    );
}
