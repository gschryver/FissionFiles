import React from 'react';
import { Route, Routes } from "react-router-dom";
import NotAuthorized from './NotAuthorized';
import Home from "./Home";
import UserProfile from "./users/UserProfile";
import UserList from "./users/UserList";
import UserProfileUpdate from "./users/UserProfileUpdate";

export default function Authenticated() {
  return (
    <Routes>
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/" element={<Home />} />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/users" element={<UserList />} /> 
      <Route path="/edit-profile/:userId" element={<UserProfileUpdate />} />
    </Routes>
  );
}
