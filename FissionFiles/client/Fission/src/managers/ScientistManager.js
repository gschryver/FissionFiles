import React, { useState, createContext } from "react";

export const ScientistContext = createContext();

const apiUrl = "https://localhost:5001/api/Scientist";

export const ScientistProvider = (props) => {
    const [scientists, setScientists] = useState([]);

    const getAllScientists = () => {
        return fetch(`${apiUrl}/GetAllScientists`)
            .then((res) => res.json())
            .then(setScientists);
    };

    const getScientistById = (id) => {
        return fetch(`${apiUrl}/GetScientistById/${id}`).then((res) => res.json());
    };

    const addScientist = (scientist) => {
        return fetch(`${apiUrl}/AddScientist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(scientist),
        }).then((res) => res.json());
    };

    const updateScientist = (scientist) => {
        return fetch(`${apiUrl}/UpdateScientist`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(scientist),
        }).then((res) => res.json());
    };

    const deleteScientist = (scientistId) => {
        return fetch(`${apiUrl}/DeleteScientist/${scientistId}`, {
            method: "DELETE",
        }).then(getAllScientists);
    };

    return (
        <ScientistContext.Provider
            value={{
                scientists,
                getAllScientists,
                getScientistById,
                addScientist,
                updateScientist,
                deleteScientist
            }}
        >
            {props.children}
        </ScientistContext.Provider>
    );
}