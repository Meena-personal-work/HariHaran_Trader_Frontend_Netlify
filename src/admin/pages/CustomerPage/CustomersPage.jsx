// import React, { useEffect, useState } from "react";
// import useCustomers from "../../hooks/useCustomers";
// import { CustomerPDF, CustomerPDFDownload } from "./CustomerPDF";
// import { PDFViewer } from "@react-pdf/renderer";
// import Header from "../../components/Header/header";
// import ConfirmModal from "../../components/ConfirmModal/confirmModal"; // ✅ Import modal
// import {
//   FaWhatsapp,
//   FaPhone,
//   FaEye,
//   FaEyeSlash,
//   FaFilePdf,
// } from "react-icons/fa";
// import "./customersPage.css";

// const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// export default function CustomersPage() {
//   const { customers, loading, error, fetchAll, deleteDispatched } =
//     useCustomers();
//   const [expandedRows, setExpandedRows] = useState({});
//   const [statusMap, setStatusMap] = useState({});
//   const [modalOpen, setModalOpen] = useState(false); // ✅ Track modal
//   const [selectedId, setSelectedId] = useState(null); // ✅ Track row clicked
//   const [modalAction, setModalAction] = useState(null); // ✅ Track which action (dispatch/delete)

//   const pendingCount = customers.filter(
//     (c) => statusMap[c._id] === "pending"
//   ).length;

//   // Update statusMap whenever customers list changes
//   useEffect(() => {
//     if (customers.length > 0) {
//       const initialStatuses = {};
//       customers.forEach((c) => {
//         initialStatuses[c._id] = c.status || "pending";
//       });
//       setStatusMap(initialStatuses);
//     }
//   }, [customers]);

//   const toggleRow = (id) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   // ✅ Call backend Dispatch API
//   const handleDispatch = async (id) => {
//     const currentStatus = statusMap[id] || "pending";
//     const newStatus = currentStatus === "pending" ? "dispatched" : "pending";

//     try {
//       const res = await fetch(`${API_BASE}/orders/${id}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!res.ok) throw new Error("Failed to update status");

//       setStatusMap((prev) => ({
//         ...prev,
//         [id]: newStatus,
//       }));
//     } catch (err) {
//       console.error(err);
//       alert("Error updating dispatch status");
//     }
//   };

//   // ✅ When clicking Dispatch button
//   const confirmDispatch = (id) => {
//     setSelectedId(id);
//     setModalAction("dispatch");
//     setModalOpen(true);
//   };

//   // ✅ When clicking Delete All button
//   const confirmDeleteDispatched = () => {
//     setModalAction("delete");
//     setModalOpen(true);
//   };

//   // ✅ Confirm action
//   const handleConfirm = () => {
//     if (modalAction === "dispatch" && selectedId) {
//       handleDispatch(selectedId);
//     }
//     if (modalAction === "delete") {
//       deleteDispatched();
//     }
//     setModalOpen(false);
//     setSelectedId(null);
//     setModalAction(null);
//   };

//   // ✅ Cancel action
//   const handleCancel = () => {
//     setModalOpen(false);
//     setSelectedId(null);
//     setModalAction(null);
//   };

//   if (loading) return <p className="status-message">Loading customers...</p>;
//   if (error) return <p className="status-message error">Error: {error}</p>;
//   if (customers.length === 0)
//     return <p className="status-message">No customers found.</p>;

//   return (
//     <div className="customers-container">
//       <Header
//         title="Customers"
//         onRefresh={fetchAll}
//         newCustomerCount={pendingCount} // ✅ show only pending count
//       />

//       <div className="table-wrapper">
//         <table className="customers-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>State</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((c) => (
//               <React.Fragment key={c._id}>
//                 <tr className="table-row">
//                   <td>{c.customerName}</td>
//                   <td>{c.customerNumber}</td>
//                   <td>{c.customerAddress}</td>
//                   <td>{c.customerState}</td>
//                   <td className="bold">₹{c.totalRate.toFixed(2)}</td>
//                   <td>
//                     <span
//                       className={
//                         statusMap[c._id] === "dispatched"
//                           ? "status dispatched"
//                           : "status pending"
//                       }
//                     >
//                       {statusMap[c._id] === "dispatched"
//                         ? "Dispatched"
//                         : "Pending"}
//                     </span>
//                     <button
//                       className="dispatch-button"
//                       onClick={() => confirmDispatch(c._id)} // ✅ Open modal
//                     >
//                       {statusMap[c._id] === "dispatched"
//                         ? "Mark Pending"
//                         : "Dispatch"}
//                     </button>
//                   </td>

//                   <td className="action-cell">
//                     <button
//                       onClick={() => toggleRow(c._id)}
//                       className="view-button"
//                     >
//                       {expandedRows[c._id] ? <FaEyeSlash /> : <FaEye />}
//                     </button>

//                     <button
//                       onClick={() =>
//                         window.open(
//                           `https://wa.me/${c.customerNumber}`,
//                           "_blank"
//                         )
//                       }
//                       className="whatsapp-button"
//                     >
//                       <FaWhatsapp />
//                     </button>

//                     <button
//                       onClick={() =>
//                         (window.location.href = `tel:${c.customerNumber}`)
//                       }
//                       className="call-button"
//                     >
//                       <FaPhone />
//                     </button>
//                   </td>
//                 </tr>

//                 {expandedRows[c._id] && (
//                   <tr className="expanded-row">
//                     <td colSpan="7">
//                       <CustomerPDFDownload customer={c}>
//                         <FaFilePdf /> Download
//                       </CustomerPDFDownload>

//                       <div
//                         style={{ marginTop: "10px", border: "1px solid #ccc" }}
//                       >
//                         <PDFViewer width="100%" height={400}>
//                           <CustomerPDF customer={c} />
//                         </PDFViewer>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>

//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//           <button
//             className="delete-button"
//             onClick={confirmDeleteDispatched} // ✅ Open modal instead of direct delete
//           >
//             Delete All Dispatched Customers
//           </button>
//         </div>
//       </div>

//       {/* ✅ Confirmation Modal */}
//       <ConfirmModal
//         open={modalOpen}
//         message={
//           modalAction === "delete"
//             ? "Are you sure you want to delete ALL dispatched customers?"
//             : "Are you sure you want to change the status?"
//         }
//         onConfirm={handleConfirm}
//         onCancel={handleCancel}
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import useCustomers from "../../hooks/useCustomers";
import { CustomerPDF, CustomerPDFDownload } from "./CustomerPDF";
// import { PDFViewer, pdf } from "@react-pdf/renderer";
import {  pdf } from "@react-pdf/renderer";

import Header from "../../components/Header/header";
import ConfirmModal from "../../components/ConfirmModal/confirmModal"; // ✅ Import modal
import {
  FaWhatsapp,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaFilePdf,
} from "react-icons/fa";
import "./customersPage.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ✅ Detect if user is on mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ✅ Inline PDF preview using iframe (matches download version)
function PdfPreview({ customer }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(<CustomerPDF customer={customer} />).toBlob();
      setBlobUrl(URL.createObjectURL(blob));
    };
    generatePdf();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [customer]);

  if (!blobUrl) return <p>Loading PDF preview...</p>;

  return (
    <iframe
      src={blobUrl}
      width="100%"
      height="400"
      style={{ border: "none" }}
      title="Order PDF"
    />
  );
}


export default function CustomersPage() {
  const { customers, loading, error, fetchAll, deleteDispatched } =
    useCustomers();
  const [expandedRows, setExpandedRows] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // ✅ Track modal
  const [selectedId, setSelectedId] = useState(null); // ✅ Track row clicked
  const [modalAction, setModalAction] = useState(null); // ✅ Track which action (dispatch/delete)

  const pendingCount = customers.filter(
    (c) => statusMap[c._id] === "pending"
  ).length;

  // Update statusMap whenever customers list changes
  useEffect(() => {
    if (customers.length > 0) {
      const initialStatuses = {};
      customers.forEach((c) => {
        initialStatuses[c._id] = c.status || "pending";
      });
      setStatusMap(initialStatuses);
    }
  }, [customers]);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Call backend Dispatch API
  const handleDispatch = async (id) => {
    const currentStatus = statusMap[id] || "pending";
    const newStatus = currentStatus === "pending" ? "dispatched" : "pending";

    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setStatusMap((prev) => ({
        ...prev,
        [id]: newStatus,
      }));
    } catch (err) {
      console.error(err);
      alert("Error updating dispatch status");
    }
  };

  // ✅ When clicking Dispatch button
  const confirmDispatch = (id) => {
    setSelectedId(id);
    setModalAction("dispatch");
    setModalOpen(true);
  };

  // ✅ When clicking Delete All button
  const confirmDeleteDispatched = () => {
    setModalAction("delete");
    setModalOpen(true);
  };

  // ✅ Confirm action
  const handleConfirm = () => {
    if (modalAction === "dispatch" && selectedId) {
      handleDispatch(selectedId);
    }
    if (modalAction === "delete") {
      deleteDispatched();
    }
    setModalOpen(false);
    setSelectedId(null);
    setModalAction(null);
  };

  // ✅ Cancel action
  const handleCancel = () => {
    setModalOpen(false);
    setSelectedId(null);
    setModalAction(null);
  };

  // ✅ Open PDF in new tab (for mobile users)
  const openPdfInNewTab = async (customer) => {
    const blob = await pdf(<CustomerPDF customer={customer} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  if (loading) return <p className="status-message">Loading customers...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;
  if (customers.length === 0)
    return <p className="status-message">No customers found.</p>;

  return (
    <div className="customers-container">
      <Header
        title="Customers"
        onRefresh={fetchAll}
        newCustomerCount={pendingCount} // ✅ show only pending count
      />

      <div className="table-wrapper">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>State</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <React.Fragment key={c._id}>
                <tr className="table-row">
                  <td>{c.customerName}</td>
                  <td>{c.customerNumber}</td>
                  <td>{c.customerAddress}</td>
                  <td>{c.customerState}</td>
                  <td className="bold">₹{c.totalRate.toFixed(2)}</td>
                  <td>
                    <span
                      className={
                        statusMap[c._id] === "dispatched"
                          ? "status dispatched"
                          : "status pending"
                      }
                    >
                      {statusMap[c._id] === "dispatched"
                        ? "Dispatched"
                        : "Pending"}
                    </span>
                    <button
                      className="dispatch-button"
                      onClick={() => confirmDispatch(c._id)} // ✅ Open modal
                    >
                      {statusMap[c._id] === "dispatched"
                        ? "Mark Pending"
                        : "Dispatch"}
                    </button>
                  </td>

                  <td className="action-cell">
                    <button
                      onClick={() => toggleRow(c._id)}
                      className="view-button"
                    >
                      {expandedRows[c._id] ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    <button
                      onClick={() =>
                        window.open(
                          `https://wa.me/${c.customerNumber}`,
                          "_blank"
                        )
                      }
                      className="whatsapp-button"
                    >
                      <FaWhatsapp />
                    </button>

                    <button
                      onClick={() =>
                        (window.location.href = `tel:${c.customerNumber}`)
                      }
                      className="call-button"
                    >
                      <FaPhone />
                    </button>
                  </td>
                </tr>

                {expandedRows[c._id] && (
                  <tr className="expanded-row">
                    <td colSpan="7">
                      <CustomerPDFDownload customer={c}>
                        <FaFilePdf /> Download
                      </CustomerPDFDownload>

                      {/* ✅ Desktop: inline PDF, Mobile: open button */}
                      {!isMobile ? (
                        <div
                          style={{
                            marginTop: "10px",
                            border: "1px solid #ccc",
                          }}
                        >
                          {/* <PDFViewer width="100%" height={400}>
                            <CustomerPDF customer={c} />
                          </PDFViewer> */}
                          <PdfPreview customer={c} />

                        </div>
                      ) : (
                        <button
                          onClick={() => openPdfInNewTab(c)}
                          style={{
                            marginTop: "10px",
                           padding: "8px 12px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginLeft: "20px",

                          }}
                        >
                          Open PDF
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            className="delete-button"
            onClick={confirmDeleteDispatched} // ✅ Open modal instead of direct delete
          >
            Delete All Dispatched Customers
          </button>
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      <ConfirmModal
        open={modalOpen}
        message={
          modalAction === "delete"
            ? "Are you sure you want to delete ALL dispatched customers?"
            : "Are you sure you want to change the status?"
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
