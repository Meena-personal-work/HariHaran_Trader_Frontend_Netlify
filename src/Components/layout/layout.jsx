import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./layout.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideButton = location.pathname === "/order" || location.pathname === "/confirmList" ||location.pathname==="/login";

  const openWhatsApp = () => {
    window.open("https://wa.me/919444324237", "_blank");
  };

  return (
    <div>
      {!hideButton && (
        <div className="floating-buttons">
          <button className="whatsapp-btn" onClick={openWhatsApp}>
            <FaWhatsapp className="whatsapp-icon" />
          </button>
          <button className="place-order-btn" onClick={() => navigate("/order")}>
            Place Order
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
