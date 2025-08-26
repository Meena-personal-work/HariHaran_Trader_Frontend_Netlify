import "./header.css";
import { FaSyncAlt, FaBell } from "react-icons/fa"; // using react-icons

export default function Header({ title, onRefresh, newCustomerCount }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        
        {/* Refresh Button */}
        <button className="refresh-btn" onClick={onRefresh} title="Refresh">
          <FaSyncAlt size={18} />
        </button>

        {/* Notification Icon */}
        <div className="notification-wrapper">
          <FaBell size={20} />
          {newCustomerCount > 0 && (
            <span className="notification-badge">{newCustomerCount}</span>
          )}
        </div>
      </div>
    </header>
  );
}
