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
//   const [selectedBrand, setSelectedBrand] = useState("hariharan"); // ✅ Default

//   // ✅ For notification count
//   const [initialCount,setInitialCount] = useState(0);

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

// useEffect(() => {
//   fetchAll(selectedBrand);
//   fetchCustomers().then(() => {
//     setInitialCount(customers.length, initialCount);
//   });
// }, [selectedBrand, initialCount]);


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
//   // const newCustomerCount = customers.length - initialCount;

//   return (
//     <>
//       {/* ✅ Header with refresh + notification */}
//       <Header
//         title="Crackers"
//         onRefresh={() => fetchAll(selectedBrand)}
//         newCustomerCount={pendingCount}
//       />

//       {/* ✅ Brand Switcher */}
//      <div className="brand-buttons">
//   <button
//     className={`brand-btn ${selectedBrand === "hariharan" ? "active" : ""}`}
//     onClick={() => setSelectedBrand("hariharan")}
//   >
//     Hariharan
//   </button>
//   <button
//     className={`brand-btn ${selectedBrand === "ayyan" ? "active" : ""}`}
//     onClick={() => setSelectedBrand("ayyan")}
//   >
//     Ayyan
//   </button>
// </div>


//       <button className="add-cracker-btn" onClick={handleAddCracker}>
//         Add Cracker
//       </button>

//       {error && <div className="error">{error}</div>}

//       {showForm && (
//         <section>
//           <h2>{editing ? "Edit Cracker" : "Add New Cracker"}</h2>
//        <CrackerForm
//   defaults={editing}
//   onSubmit={handleFormSubmit}
//   onCancel={() => setShowForm(false)}
//   selectedBrand={selectedBrand}   // ✅ added
// />

//         </section>
//       )}

//       <section>
//         <h2>
//           {selectedBrand} Crackers ({items.length})
//         </h2>
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
    fetchAll: fetchCrackers,
    createOne,
    updateOne,
    removeOne,
    toggleOne,
  } = useCrackers();

  const { customers, fetchAll: fetchCustomersFromHook } = useCustomers();

  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [statusMap, setStatusMap] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("hariharan");

  // -------------------------
  // Fetch customers once on mount
  // -------------------------
  useEffect(() => {
    const fetchData = async () => {
      await fetchCustomersFromHook(); // fetch customers
      fetchCrackers(selectedBrand);   // fetch crackers for default brand
    };
    fetchData();
  }, []); // empty dependency → runs once

  // -------------------------
  // Fetch crackers when brand changes
  // -------------------------
  useEffect(() => {
    fetchCrackers(selectedBrand);
  }, [selectedBrand]); // only runs on brand change

  // -------------------------
  // Set initial status map
  // -------------------------
  useEffect(() => {
    if (customers.length) {
      const map = {};
      customers.forEach((c) => {
        map[c._id] = c.status || "pending";
      });
      setStatusMap(map);
    }
  }, [customers]);

  // -------------------------
  // Pending customers count
  // -------------------------
  const pendingCount = customers.filter(
    (c) => statusMap[c._id] === "pending"
  ).length;

  // -------------------------
  // Handlers
  // -------------------------
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
      <Header
        title="Crackers"
        onRefresh={() => fetchCrackers(selectedBrand)}
        newCustomerCount={pendingCount}
      />

      <div className="brand-buttons">
        {["hariharan", "ayyan"].map((brand) => (
          <button
            key={brand}
            className={`brand-btn ${selectedBrand === brand ? "active" : ""}`}
            onClick={() => setSelectedBrand(brand)}
          >
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </button>
        ))}
      </div>

      <button className="add-cracker-btn" onClick={handleAddCracker}>
        Add Cracker
      </button>

      {error && <div className="error">{error}</div>}

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

      <section>
        <h2>{selectedBrand} Crackers ({items.length})</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <CrackerList
            items={items}
            onEdit={(cracker) => { setEditing(cracker); setShowForm(true); }}
            onDelete={(id) => setDeleteId(id)}
            onToggle={toggleOne}
          />
        )}
      </section> 

      <ConfirmModal
        open={!!deleteId}
        message="Are you sure you want to delete this cracker?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}