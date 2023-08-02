import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
   );
};