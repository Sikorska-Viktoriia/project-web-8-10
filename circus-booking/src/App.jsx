import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      {/* Можна тут */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:showId" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
