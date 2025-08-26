// import { useState } from "react";
// import "./sidebar.css";

// export default function Sidebar({ activePage, onNavigate }) {
//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         🎆 Admin Panel
//       </div>
//       <nav className="sidebar-menu">
//         <button
//           className={`menu-item ${activePage === "crackers" ? "active" : ""}`}
//           onClick={() => onNavigate("crackers")}
//         >
//           Crackers
//         </button>
//         <button
//           className={`menu-item ${activePage === "customers" ? "active" : ""}`}
//           onClick={() => onNavigate("customers")}
//         >
//           Customers
//         </button>
//       </nav>
//     </aside>
//   );
// }


import { useState } from "react";
import "./sidebar.css";

export default function Sidebar({ activePage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          🎆 Admin Panel
          {/* Close button for mobile */}
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activePage === "crackers" ? "active" : ""}`}
            onClick={() => {
              onNavigate("crackers");
              setIsOpen(false);
            }}
          >
            Crackers
          </button>
          <button
            className={`menu-item ${activePage === "customers" ? "active" : ""}`}
            onClick={() => {
              onNavigate("customers");
              setIsOpen(false);
            }}
          >
            Customers
          </button>
        </nav>
      </aside>
    </>
  );
}
