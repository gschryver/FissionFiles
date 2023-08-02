import React, { useState, createContext } from "react";

export const UserContext = createContext();

const apiUrl = "https://localhost:5001";

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

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

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const getUserStatus = (email) => {
    return fetch(`${apiUrl}/api/user/GetByEmail?email=${email}`).then((res) =>
      res.json(),
    );
  };

  return (
    <UserContext.Provider value={{ user, login, logout, getUserStatus }}>
      {props.children}
    </UserContext.Provider>
  );
};
