import React from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './Login'; 
import Register from './Register'

export default function Authorize() {

    return(
         <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         </Routes>
      ); 
   }
