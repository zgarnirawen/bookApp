import React from "react";
import ToggleButton from "./ToggleButton";
import logo from "../assets/logo.jpg";

function Header() {
  return (
    <header className="header-container">
      <img src={logo} alt="Book App Logo" className="header-logo" />
      <div className="header-content">
        <h1>📚 Book App</h1>
        <ToggleButton />
      </div>
    </header>
  );
}

export default Header;
