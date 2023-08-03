import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from "./Home";
import NotAuthorized from "./NotAuthorized";


export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotAuthorized />} />
      </Routes>
   );
};