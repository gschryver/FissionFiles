import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import UserProfile from "./users/UserProfile";
import UserList from "./users/UserList";
import Login from './Login';

export default function ApplicationViews() {

 return(
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} /> 
      </Routes>
   );
};