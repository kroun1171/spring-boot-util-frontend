// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Registration"; // Make sure Register component exists
import "./App.css";
import Table from "./Table";
import TableWithOutFilters from "./TableWithOutFilters";
//import RandomImage from "./RandomImage";
import OwnRandImage from "./OwnRandImage";
import CryptoChart from "./CryptoChart";
//import CryptoChart from "./CryptoChart";

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Passenger App</h1>
        <nav>
          <Link to="/login">Login</Link> | 
          <Link to="/register">Register</Link> |
          <Link to="/table">Table</Link> |
          <Link to="/table-no-filter">Table No Filter</Link> |
          <Link to="/random-image">Random Image</Link> |
          <Link to="/chart">Chart</Link> 
          
        </nav>
        <Routes>
          {/* Use element prop with the component */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/table" element={<Table />} />
          <Route path="/table-no-filter" element={< TableWithOutFilters/>} />
          <Route path="/random-image" element={< OwnRandImage/>} />
          <Route path="/chart" element={< CryptoChart/>} />
    
          <Route path="/" element={<h2>Welcome to the Passenger App</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
