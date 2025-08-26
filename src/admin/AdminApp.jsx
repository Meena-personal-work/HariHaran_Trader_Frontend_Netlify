import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminApp.css";

import Sidebar from "./components/Sidebar/sidebar";
import CrackersPage from "./pages/CrackersPage/crackersPage";
import CustomersPage from "./pages/CustomerPage/CustomersPage";
import Login from "../Pages/Login/Login";

export default function AdminApp() {
  const [activePage, setActivePage] = useState("crackers");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

     // ✅ If not logged in, show Login page only
  if (!isLoggedIn) {
    return (
      <div className="login-wrapper">
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    );
  }

  return (
    <div className="layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
  
      <div className="main-content">
        {activePage === "crackers" && <CrackersPage />}
        {activePage === "customers" && <CustomersPage />}
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
