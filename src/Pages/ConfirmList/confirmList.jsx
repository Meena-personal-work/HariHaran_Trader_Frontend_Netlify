import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { pdf, Document, Page, Text, View, Font } from "@react-pdf/renderer";
import NotoSansTamilRegular from "./NotoSansTamil-Regular.ttf";
import NotoSansTamilBold from "./NotoSansTamil-Bold.ttf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "./confirmList.css";
import "../Order/order.css";

Font.register({
  family: "Noto Sans Tamil",
  fonts: [
    { src: NotoSansTamilRegular, fontWeight: "normal" },
    { src: NotoSansTamilBold, fontWeight: "bold" },
  ],
});

const ConfirmListPage = ({
  setSelectedItems,
  selectedItems,
  totalRate,
  setTotalRate,
  crackers,
  setCrackers,
  customerName,
  setCustomerName,
  customerNumber,
  setCustomerNumber,
  customerAddress,
  setCustomerAddress,
  customerState,
  setCustomerState,
  setDownloaded,
  downloaded,
  brand
}) => {
  // const [setSelectedItemsPdf] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";


  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const result = window.confirm(
        "Are you sure, want to start from the first page?"
      );
      if (result) navigate("/");
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate]);

  const handleEdit = () => {
    navigate("/order");
    window.scrollTo(0, 0);
    
  };

  const isFormValid =
    customerName.trim() !== "" &&
    customerNumber.trim() !== "" &&
    customerAddress.trim() !== "" &&
    customerState.trim() !== "";

  const generateNumber = () => Date.now();
  const getOrderDate = () => {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  };

  const handleClearForm = () => {
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");
    setCustomerState("");
    setCrackers([]);
    setSelectedItems([]);
    setTotalRate(0);
  };

const handleConfirmOrder = async () => {
 if (!isFormValid || loading) return; // block if already processing
setLoading(true);


  const orderNumber = generateNumber(); // unique order number
  const orderDate = getOrderDate() // proper Date object for backend

  const selectedCrackers = crackers.flatMap((category) =>
    category.items
      .filter((item) => item.checked)
      .map((item) => ({
        name: item.name,
        tamilName: item.tamilName,
        quantity: item.quantity,
        rate: parseFloat(item.rate),
        amount: item.quantity * parseFloat(item.rate),
        category: category.category,
      }))
  );

  if (selectedCrackers.length === 0) {
    toast.error("No crackers selected!");
     setLoading(false);
    return;
  }

  // setSelectedItemsPdf(selectedCrackers);

  const orderPayload = {
    customerName,
    customerNumber,
    customerAddress,
    customerState,
    totalRate,
    orderNumber,
    orderDate,
    items: selectedCrackers,
  };

  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save order");
    }

    // const formUrl ="https://script.google.com/macros/s/AKfycbw5GhqEY7at54dkosbN4LCMID9_Q3qWew8hr20w8yj7MBpVl8W2lZgS7Rsuqn9guslS/exec?sheet=Hari Haran Trader's Customer";
    // ===== 2. Save into Google Sheets =====
let formUrl = "";

if (brand === "ayyan") {
  formUrl =
    "https://script.google.com/macros/s/AKfycbw5GhqEY7at54dkosbN4LCMID9_Q3qWew8hr20w8yj7MBpVl8W2lZgS7Rsuqn9guslS/exec?sheet=Ayyan's Crackers Customer";
} else {
  formUrl =
    "https://script.google.com/macros/s/AKfycbw5GhqEY7at54dkosbN4LCMID9_Q3qWew8hr20w8yj7MBpVl8W2lZgS7Rsuqn9guslS/exec?sheet=Hari Haran Trader's Customer";
}


    const formData = new URLSearchParams();
    formData.append("customerName", customerName);
    formData.append("customerNumber", customerNumber);
    formData.append("customerAddress", customerAddress);
    formData.append("customerState", customerState);
    formData.append("totalRate", totalRate);

    // Optionally also store items as JSON string (so you can expand later)
    // formData.append("items", JSON.stringify(selectedCrackers));

    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    toast.success("Order submitted successfully!");
    confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 } });

    // // Generate PDF
    // const formatDate = (date) => {
    //   const d = new Date(date);
    //   return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    // };

    const MyDocument = (
      <Document>
        <Page style={{ borderWidth: 1, borderStyle: "solid", padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
            HariHaran Trader Sivakasi
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
            List Of Order Placed
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
            Order Number: {orderNumber} &nbsp;&nbsp; Order Date: {orderDate}
          </Text>
          <Text style={{ fontWeight: "bold", marginBottom: 10, textAlign: "center", fontSize: 14, marginTop: 12 }}>
            Mobile Number: {customerNumber}
          </Text>

          <View style={{ marginBottom: 10 }}>
            {selectedCrackers.length > 0 && (
              <View style={{ flexDirection: "row", backgroundColor: "#f1eeee" }}>
                <Text style={{ flex: 0.3, textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 13 }}>S.No</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 13 }}>Cracker Name</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 13 }}>Tamil Name</Text>
                <Text style={{ flex: 0.3, textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 13 }}>Qty</Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 13 }}>
                  {brand === "ayyan" ? "50% Discount Rate" : "80% Discount Rate"}
                </Text>
                <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 13 }}>Amount</Text>
              </View>
            )}

            {selectedCrackers.map((item, idx) => (
              <View key={idx} style={{ flexDirection: "row" }}>
                <Text style={{ flex: 0.3, textAlign: "center", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 11 }}>{idx + 1}</Text>
                <Text style={{ flex: 1, textAlign: "left", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 11 }}>{item.name}</Text>
                <Text style={{ flex: 1, textAlign: "left", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 11, fontFamily: "Noto Sans Tamil" }}>{item.tamilName}</Text>
                <Text style={{ flex: 0.3, textAlign: "center", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 11 }}>{item.quantity}</Text>
                <Text style={{ flex: 1, textAlign: "center", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 11 }}>{item.rate}</Text>
                <Text style={{ flex: 1, textAlign: "center", borderWidth: 1, borderColor: "black", padding: 3, fontSize: 11 }}>{item.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>Total Amount: {totalRate.toFixed(2)}</Text>

          <Text style={{ fontWeight: "700", backgroundColor: "#f1eeee", fontSize: 15, marginTop: 40 }}>Customer Information</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>Customer Name: {customerName}</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 6 }}>Customer Number: {customerNumber}</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 6 }}>Customer Address: {customerAddress}</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 6 }}>Customer State: {customerState}</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 15 }}>Overall Total Amount: {totalRate.toFixed(2)}</Text>
        </Page>
      </Document>
    );

    const asPdf = pdf(MyDocument);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Order-${orderNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleClearForm();
    navigate("/order");
          window.location.reload();

  } catch (error) {
    console.error("Submission error:", error);
    toast.error("Error submitting order: " + error.message);
  }finally {
    setLoading(false); // unlock button
  }
  
};

  return (
    <div>
      <div className="edit-container">
        <button className="edit-button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>

      <div className="full-input-container">
        <div className="crackersGif-confirmList"></div>
        <div className="input-container-confirmList">
          <div className="customer-container-title">Customer Information</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer Name:</span>
            <div className="customer-inputbox-name-confirmList">{customerName}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer Number:</span>
            <div className="customer-inputbox-confirmList">{customerNumber}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer Address:</span>
            <div className="customer-inputbox-address-confirmList">{customerAddress}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer State:</span>
            <div className="customer-inputbox-address-confirmList">{customerState}</div>
          </div>
        </div>
      </div>

      <div className="list-container-confirmList">
        {selectedItems.length > 0 && (
          <table className="table" align="center" style={{ width: "85%" }}>
            <thead>
              <tr className="tablecell" style={{ fontSize: "14px" }}>
                <th className="tablecell">S.No</th>
                <th className="tablecell">Cracker Name</th>
                <th className="tablecell" style={{ fontSize: "13px" }}>Qty</th>
                <th className="tablecell">{`${brand === 'ayyan' ? '50% Discount Rate' : '80% Discount Rate'}`}</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index} className="tableRow" style={{ fontSize: "14px" }}>
                  <td className="tablecell" style={{ textAlign: "center" }}>{index + 1}</td>
                  <td className="tablecell" style={{ textAlign: "left" }}>
                    {item.name}
                    <div style={{ marginTop: "15px" }}>{item.tamilName}</div>
                  </td>
                  <td className="tablecell" style={{ textAlign: "center", width: "10%" }}>{item.quantity}</td>
                  <td className="tablecell" style={{ textAlign: "center" }}>₹{item.quantity * parseFloat(item.rate)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" style={{ fontWeight: "bold", backgroundColor: "#f1eeee" }}>Total Amount</td>
                <td className="tablecell" style={{ fontWeight: "bold", backgroundColor: "#f1eeee" }}>₹{totalRate}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="button-container-confirmList">
      <button
  className="Confirm-order"
  onClick={handleConfirmOrder}
  disabled={!isFormValid || loading}
  style={{
    opacity: isFormValid && !loading ? 1 : 0.6,
    cursor: isFormValid && !loading ? "pointer" : "not-allowed",
  }}
>
  {loading ? "Processing..." : "Confirm Order"}
</button>

      </div>

      <div style={{ height: "100px" }} ref={scrollRef}></div>
    </div>
  );
};

export default ConfirmListPage;
