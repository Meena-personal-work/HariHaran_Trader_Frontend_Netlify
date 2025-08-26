import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <div>
      <div className="header-container">
        <div className="herader-logo-name-container">
          <img
            className="header-logo"
            title="Hariharan TRADER"
            alt="Hariharan TRADER"
            src="./website-logo.png"
          ></img>
          <span className="header-name">Hariharan Trader</span>
        </div>
        <div className="menu-container">
          <Link to="/" className="header-menu">
            Home
          </Link>
          <Link to="/about" className="header-menu">
            About
          </Link>
          <Link to="/order" className="header-menu">
            Order
          </Link>
          <Link to="/contact" className="header-menu">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
