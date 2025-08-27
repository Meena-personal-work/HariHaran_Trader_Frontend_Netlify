// import { useEffect, useState } from "react";
// import useCrackers from "../../hooks/useCrackers";
// import CrackerForm from "../../components/CrackerForm/CrackerForm";
// import CrackerList from "../../components/CrackerList/CrackerList";
// import ConfirmModal from "../../components/ConfirmModal/confirmModal";
// import useCustomers from "../../hooks/useCustomers";

// import Header from "../../components/Header/header";
// import "./crackersPage.css";

// export default function CrackersPage() {
//   const {
//     items,
//     loading,
//     error,
//     fetchAll,
//     createOne,
//     updateOne,
//     removeOne,
//     toggleOne,
//   } = useCrackers();

//   const { customers, fetchAll: fetchCustomers } = useCustomers();

//   const [editing, setEditing] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [statusMap, setStatusMap] = useState({});

//   // ✅ For notification count
//   const [initialCount, setInitialCount] = useState(0);

//   const pendingCount = customers.filter(
//     (c) => statusMap[c._id] === "pending"
//   ).length;

//   useEffect(() => {
//     if (customers.length > 0) {
//       const initialStatuses = {};
//       customers.forEach((c) => {
//         initialStatuses[c._id] = c.status || "pending";
//       });
//       setStatusMap(initialStatuses);
//     }
//   }, [customers]);

//   useEffect(() => {
//     fetchAll();
//     fetchCustomers().then(() => {
//       setInitialCount(customers.length);
//     });
//   }, []);

//   const handleDeleteConfirm = () => {
//     removeOne(deleteId);
//     setDeleteId(null);
//   };

//   const handleAddCracker = () => {
//     setEditing(null);
//     setShowForm(true);
//   };

//   const handleFormSubmit = (data) => {
//     if (editing) {
//       updateOne(editing._id, data);
//       setEditing(null);
//     } else {
//       createOne(data);
//     }
//     setShowForm(false);
//   };

//   // ✅ Calculate new customers after page load
//   const newCustomerCount = customers.length - initialCount;

//   return (
//     <>
//       {/* ✅ Header with refresh + notification */}
//       <Header
//         title="Crackers"
//         onRefresh={fetchAll}
//         newCustomerCount={pendingCount}
//       />

//       <button className="add-cracker-btn" onClick={handleAddCracker}>Add Cracker</button>

//       {error && <div className="error">{error}</div>}

//       {showForm && (
//         <section>
//           <h2>{editing ? "Edit Cracker" : "Add New Cracker"}</h2>
//           <CrackerForm
//             defaults={editing}
//             onSubmit={handleFormSubmit}
//             onCancel={() => setShowForm(false)}
//           />
//         </section>
//       )}

//       <section>
//         <h2>All Crackers ({items.length})</h2>
//         {loading ? (
//           <div className="loading">Loading...</div>
//         ) : (
//           <CrackerList
//             items={items}
//             onEdit={(cracker) => {
//               setEditing(cracker);
//               setShowForm(true);
//             }}
//             onDelete={(id) => setDeleteId(id)}
//             onToggle={toggleOne}
//           />
//         )}
//       </section>

//       <ConfirmModal
//         open={!!deleteId}
//         message="Are you sure you want to delete this cracker?"
//         onConfirm={handleDeleteConfirm}
//         onCancel={() => setDeleteId(null)}
//       />
//     </>
//   );
// }


import { useEffect, useState } from "react";
import useCrackers from "../../hooks/useCrackers";
import useCustomers from "../../hooks/useCustomers";
import CrackerForm from "../../components/CrackerForm/CrackerForm";
import CrackerList from "../../components/CrackerList/CrackerList";
import ConfirmModal from "../../components/ConfirmModal/confirmModal";
import Header from "../../components/Header/header";
import "./crackersPage.css";

export default function CrackersPage() {
  const {
    items,
    loading,
    error,
    fetchAll,
    createOne,
    updateOne,
    removeOne,
    toggleOne,
    page,
    pages,
  } = useCrackers();

  const { customers, fetchAll: fetchCustomers } = useCustomers();

  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [statusMap, setStatusMap] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("hariharan"); // default brand
  const [initialCount, setInitialCount] = useState(0);

  const pendingCount = customers.filter(
    (c) => statusMap[c._id] === "pending"
  ).length;

  // Initialize statusMap after fetching customers
  useEffect(() => {
    if (customers?.length > 0) {
      const initialStatuses = {};
      customers.forEach((c) => {
        initialStatuses[c._id] = c.status || "pending";
      });
      setStatusMap(initialStatuses);
    }
  }, [customers]);

  // Fetch customers only once
  useEffect(() => {
    fetchCustomers().then((fetchedCustomers) => {
      setInitialCount(fetchedCustomers?.length || 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch crackers whenever selectedBrand or page changes
  useEffect(() => {
    fetchAll(selectedBrand, 1, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

  // Pagination handlers
  const handleNextPage = () => {
    if (page < pages) fetchAll(selectedBrand, page + 1, 100);
  };

  const handlePrevPage = () => {
    if (page > 1) fetchAll(selectedBrand, page - 1, 100);
  };

  const handleDeleteConfirm = () => {
    removeOne(deleteId);
    setDeleteId(null);
  };

  const handleAddCracker = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (editing) {
      updateOne(editing._id, data);
      setEditing(null);
    } else {
      createOne(data);
    }
    setShowForm(false);
  };

  return (
    <>
      {/* Header with refresh + notification */}
      <Header
        title="Crackers"
        onRefresh={() => fetchAll(selectedBrand, page, 100)}
        newCustomerCount={pendingCount}
      />

      {/* Brand Switcher */}
      <div className="brand-buttons">
        <button
          className={`brand-btn ${selectedBrand === "hariharan" ? "active" : ""}`}
          onClick={() => setSelectedBrand("hariharan")}
        >
          Hariharan
        </button>
        <button
          className={`brand-btn ${selectedBrand === "ayyan" ? "active" : ""}`}
          onClick={() => setSelectedBrand("ayyan")}
        >
          Ayyan
        </button>
      </div>

      {/* Add Cracker */}
      <button className="add-cracker-btn" onClick={handleAddCracker}>
        Add Cracker
      </button>

      {error && <div className="error">{error}</div>}

      {/* Cracker Form */}
      {showForm && (
        <section>
          <h2>{editing ? "Edit Cracker" : "Add New Cracker"}</h2>
          <CrackerForm
            defaults={editing}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            selectedBrand={selectedBrand}
          />
        </section>
      )}

      {/* Cracker List */}
      <section>
        <h2>
          {selectedBrand} Crackers ({items.length})
        </h2>
        {/* Pagination */}
            <section className="pagination">
              <button onClick={handlePrevPage} disabled={page <= 1 || loading}>
                Previous
              </button>
              <span>
                Page {page} of {pages}
              </span>
              <button onClick={handleNextPage} disabled={page >= pages || loading}>
                Next
              </button>
            </section>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <CrackerList
              items={items}
              onEdit={(cracker) => {
                setEditing(cracker);
                setShowForm(true);
              }}
              onDelete={(id) => setDeleteId(id)}
              onToggle={toggleOne}
            />
          </>
        )}
      </section>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={!!deleteId}
        message="Are you sure you want to delete this cracker?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}