import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/movie/:id' element={<MovieDetail />}/>
      <Route path='*' element={<p>Not Found</p>}/>
    </Routes>
  );
}

export default App;