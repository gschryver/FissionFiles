import React, { useState, createContext } from "react";

export const UserContext = createContext();

const apiUrl = "https://localhost:5001";

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  // Login Functionality
  const login = (userObject) => {
    const encodedEmail = encodeURIComponent(userObject.email);

    return fetch(`${apiUrl}/api/User/GetByEmail?email=${encodedEmail}`)
      .then((r) => r.json())
      .then((user) => {
        if (user && user.id && user.isActive) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          return user;
        } else {
          throw new Error("Invalid email or account deactivated");
        }
      })
      .catch((error) => {
        throw new Error("Invalid email or account deactivated");
      });
  };

  // Logout Functionality
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Get User Status
  const getUserStatus = (email) => {
    return fetch(`${apiUrl}/api/user/GetByEmail?email=${email}`).then((res) =>
      res.json(),
    );
  };

  // Register Functionality
  const register = (userObject) => {
    return fetch(`${apiUrl}/api/User/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
      .then((r) => r.json())
      .then((user) => {
        if (user && user.id && user.isActive) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          return user;
        } else {
          throw new Error("Registration failed");
        }
      })
      .catch((error) => {
        throw new Error("Registration failed");
      });
  };

  // Profile Stuff 
  const getUserById = (id) => {
    return fetch(`${apiUrl}/api/user/GetById/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        return res.json();
      });
  };

  // User List 
  const getUsers = () => {
    return fetch(`${apiUrl}/api/User/GetAllUsers`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      });
  };
  

  return (
    <UserContext.Provider value={{ user, login, logout, getUserStatus, register, getUserById, getUsers }}>
      {props.children}
    </UserContext.Provider>
  );
};