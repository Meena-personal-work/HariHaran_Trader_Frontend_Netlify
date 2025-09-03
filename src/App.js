import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Order from "./Pages/Order/order.jsx";
import ConfirmListPage from "./Pages/ConfirmList/confirmList.jsx";
import Header from "./Components/Header/header.jsx";
import Home from "./Pages/Home/home.jsx";
import About from "./Pages/About/about.jsx";
import Contact from "./Pages/Contact/contact.jsx";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer/footer.jsx";
import Layout from "./Components/layout/layout.jsx";
import ScrollToTop from "./Components/scrollToTop/scrollToTop.jsx";
import Login from "./Pages/Login/Login.jsx";

import AdminApp from "./admin/AdminApp.jsx";

function App() {
  const location = useLocation(); // ✅ get current route
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [crackers, setCrackers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerState, setCustomerState] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [brand, setBrand] = useState("hariharan");
  const [loading, setLoading] = useState(false);

  const isAdminRoute = location.pathname.startsWith("/admin"); 
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";


  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        setLoading(true);
        setCrackers([]);
        const response = await fetch(
          `${API_BASE}/crackers/customer?brand=${brand}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          const grouped = {};
          data.forEach((row) => {
            const category = row["category"];
            if (!grouped[category]) grouped[category] = [];

            grouped[category].push({
              name: row["englishName"],
              tamilName: row["tamilName"],
              originalRate: parseFloat(row["originalRate"]),
              rate: parseFloat(row["discountRate"]),
              imageUrl: row["imageUrl"] || "",
              quantity: 0,
              checked: false,
            });
          });

          const structuredData = Object.entries(grouped).map(([category, items]) => ({
            category,
            items,
          }));

          setCrackers(structuredData);
          setTotalRate(0);
        } else {
          console.error("Expected array but got:", data);
          setCrackers([]);
        }
      } catch (err) {
        console.error("Failed to fetch crackers from backend API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendData();
  }, [brand]);

  // ✅ Check if current path is login
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App">
      <ScrollToTop />
      <ToastContainer />
      {!isLoginPage && !isAdminRoute && <Header />}
 {/* Hide header on login */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/order"
          element={
            <Order
              setSelectedItems={setSelectedItems}
              totalRate={totalRate}
              setTotalRate={setTotalRate}
              crackers={crackers}
              setCrackers={setCrackers}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerNumber={customerNumber}
              setCustomerNumber={setCustomerNumber}
              customerAddress={customerAddress}
              setCustomerAddress={setCustomerAddress}
              customerState={customerState}
              setCustomerState={setCustomerState}
              brand={brand}
              setBrand={setBrand}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/confirmList"
          element={
            <ConfirmListPage
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              totalRate={totalRate}
              setTotalRate={setTotalRate}
              crackers={crackers}
              setCrackers={setCrackers}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerNumber={customerNumber}
              setCustomerNumber={setCustomerNumber}
              customerAddress={customerAddress}
              setCustomerAddress={setCustomerAddress}
              customerState={customerState}
              setCustomerState={setCustomerState}
              setDownloaded={setDownloaded}
              downloaded={downloaded}
              brand={brand}
            />
          }
        />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
      {!isLoginPage && !isAdminRoute && <Layout />}
{!isLoginPage && !isAdminRoute && <Footer />}

    </div>
  );
}

export default App;
