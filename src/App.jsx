import React, { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { Route, Routes } from "react-router-dom";
import Create from "./Components/Create/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/PostContext";

function App() {
  return (
    <div>
      <Post>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<ViewPost />} />

      </Routes>
      </Post>
    </div>
  );
}

export default App;
