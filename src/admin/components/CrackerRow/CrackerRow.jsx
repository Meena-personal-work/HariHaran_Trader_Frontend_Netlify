

// import { useState } from "react";
// import { currencyINR } from "../../utils/formatters";
// import "./crackerRow.css"

// export default function CrackerRow({ item, onEdit, onDelete }) {
//   const [loading, setLoading] = useState(true);
//   // const pct = percentOff(item.originalRate, item.discountRate);

 
//   return (
//     <tr className="crackers-tableRow">
//       {/* Image */}
//       <td style={{ textAlign: "center" }}>
//         <img
//           src={item.imageUrl}
//           alt={item.englishName}
//           onLoad={() => setLoading(false)}
//           style={{
//             width: "60px",
//             height: "60px",
//             objectFit: "cover",
//             borderRadius: "6px",
//             display: loading ? "none" : "block",
//           }}
//         />
//       </td>

//       {/* Names */}
//       <td>
//         <div>{item.englishName}</div>
//         <div style={{ marginTop: "5px", color: "#666" }}>{item.tamilName}</div>
//       </td>

//       {/* Original Rate */}
//       <td style={{ textAlign: "center", textDecoration: "line-through" }}>
//         {currencyINR(item.originalRate)}
//       </td>

//       {/* Discount Rate */}
//       <td style={{ textAlign: "center" }}>{currencyINR(item.discountRate)}</td>

//       {/* Show/Hide Toggle */}
//       <td style={{ textAlign: "center" }}>
//           {item?.status===false?"Hidden":"Show"}
//       </td>

//       {/* Actions */}
//       <td className="crackers-edit-delete-btn" style={{ textAlign: "center" }}>
//         <button className="cracker-row-btn btn-warning" onClick={() => {
//  window.scrollTo({ top: 0, behavior: "smooth" });
//           onEdit(item)
//           }}>
//           Edit
//         </button>
//         <button className="cracker-row-btn  btn-danger" onClick={() => onDelete(item._id)}>
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// }
import { useState } from "react";
import { currencyINR } from "../../utils/formatters";
import "./crackerRow.css";

export default function CrackerRow({ item, onEdit, onDelete }) {
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <tr className="crackers-tableRow">
        {/* Image */}
        <td style={{ textAlign: "center", position: "relative" }}>
          {loading && (
            <div className="image-loader">
              <div className="spinner"></div>
            </div>
          )}

          <img
            src={item.imageUrl}
            alt={item.englishName}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)} // stop loader if error
            onClick={() => setPreviewOpen(true)}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
              display: loading ? "none" : "block",
              cursor: "pointer",
            }}
          />
        </td>

        {/* Names */}
        <td>
          <div>{item.englishName}</div>
          <div style={{ marginTop: "5px", color: "#666" }}>
            {item.tamilName}
          </div>
        </td>

        {/* Original Rate */}
        <td style={{ textAlign: "center", textDecoration: "line-through" }}>
          {currencyINR(item.originalRate)}
        </td>

        {/* Discount Rate */}
        <td style={{ textAlign: "center" }}>{currencyINR(item.discountRate)}</td>

        {/* Show/Hide Toggle */}
        <td style={{ textAlign: "center" }}>
          {item?.status === false ? "Hidden" : "Show"}
        </td>

        {/* Actions */}
        <td
          className="crackers-edit-delete-btn"
          style={{ textAlign: "center" }}
        >
          <button
            className="cracker-row-btn btn-warning"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              onEdit(item);
            }}
          >
            Edit
          </button>
          <button
            className="cracker-row-btn btn-danger"
            onClick={() => onDelete(item._id)}
          >
            Delete
          </button>
        </td>
      </tr>

      {/* ✅ Image Preview Modal */}
      {previewOpen && (
        <div className="preview-overlay" onClick={() => setPreviewOpen(false)}>
          <div className="preview-container">
            <img src={item.imageUrl} alt={item.englishName} />
          </div>
        </div>
      )}
    </>
  );
}
