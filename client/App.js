import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
