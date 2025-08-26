// import React from "react";
// import CrackerRow from "../CrackerRow/CrackerRow";
// import "./crackerList.css";

// export default function CrackerList({ items, onEdit, onDelete }) {
//   // ✅ Directly group items (no filtering)
//   const grouped = items.reduce((acc, item) => {
//     if (!acc[item.category]) acc[item.category] = [];
//     acc[item.category].push(item);
//     return acc;
//   }, {});

//   const categories = Object.keys(grouped);

//   return (
//     <table className="cracker-table">
//       <thead>
//         <tr>
//           <th>Image</th>
//           <th>Cracker Name</th>
//           <th>Original Rate</th>
//           <th>Discount Rate</th>
//           <th>Status</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {categories.length === 0 ? (
//           <tr>
//             <td colSpan="6" className="no-data">
//               No crackers found.
//             </td>
//           </tr>
//         ) : (
//           categories.map((cat) => (
//             <React.Fragment key={cat}>
//               <tr className="category-row">
//                 <td colSpan="6" style={{ fontWeight: "bold", background: "#f0f0f0" }}>
//                   {cat}
//                 </td>
//               </tr>

//               {grouped[cat].map((it) => (
//                 <CrackerRow
//                   key={it._id}
//                   item={it}
//                   onEdit={onEdit}
//                   onDelete={onDelete}
//                 />
//               ))}
//             </React.Fragment>
//           ))
//         )}
//       </tbody>
//     </table>
//   );
// }


import React from "react";
import CrackerRow from "../CrackerRow/CrackerRow";
import "./crackerList.css";

export default function CrackerList({ items, onEdit, onDelete }) {
  // ✅ Directly group items (no filtering)
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <div className="table-container"> {/* ✅ Scroll wrapper */}
      <table className="cracker-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Cracker Name</th>
            <th>Original Rate</th>
            <th>Discount Rate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No crackers found.
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <React.Fragment key={cat}>
                <tr className="category-row">
                  <td
                    colSpan="6"
                    style={{ fontWeight: "bold", background: "#f0f0f0" }}
                  >
                    {cat}
                  </td>
                </tr>

                {grouped[cat].map((it) => (
                  <CrackerRow
                    key={it._id}
                    item={it}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
