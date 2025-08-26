// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-title">HARIHARAN TRADER</h3>
          <p>
            We offer high-quality, eco-friendly crackers with prompt festival
            delivery and excellent customer support.
          </p>
          <div className="footer-socials"></div>
          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FontAwesomeIcon icon={faArrowUp} /> BACK TO TOP
          </button>
        </div>

        <div className="footer-section links">
          <h4>Site Map</h4>
          <ul className="site-map-ul">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Info</h4>
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> No.3/1341/15, Sattur Road,
            Opp. Old PRC Bus Depot, Near East Police Station, SIVAKASI - 626 189
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> 9444324237
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> hariayyansworld@gmail.com
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div>Copyright © 2025, Hariharan Trader. All Rights Reserved.</div>
        <div>
          Developed by <span className="developer-name">Bloobind</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
