// import { currencyINR, percentOff } from "../../utils/formatters";

// export default function CrackerRow({ item, onEdit, onDelete }) {
//   const pct = percentOff(item.originalRate, item.discountRate);

//   return (
//     <tr>
//       {/* Image */}
//       <td>
//         <img src={item.imageUrl} alt={item.englishName} className="table-image" />
//       </td>

//       {/* English + Tamil Name */}
//       <td>
//         <div className="english">{item.englishName}</div>
//         <div className="tamil">{item.tamilName}</div>
//       </td>

//       {/* Original & Discount Rate */}
//       <td>
//         <span className="original">{currencyINR(item.originalRate)}</span> /{" "}
//         <span className="discount">{currencyINR(item.discountRate)}</span>
//       </td>

//       {/* % Save */}
//       <td className="save-tag">Save {pct}%</td>

//       {/* Actions */}
//       <td>
//         <button className="btn btn-warning" onClick={() => onEdit(item)}>Edit</button>
//         <button className="btn btn-danger" onClick={() => onDelete(item._id)}>Delete</button>
//       </td>
//     </tr>
//   );
// }


import { useState } from "react";
import { currencyINR, percentOff } from "../../utils/formatters";
import "./crackerRow.css"

export default function CrackerRow({ item, onEdit, onDelete }) {
  const [loading, setLoading] = useState(true);
  const pct = percentOff(item.originalRate, item.discountRate);

 
  return (
    <tr className="tableRow">
      {/* Image */}
      <td style={{ textAlign: "center" }}>
        <img
          src={item.imageUrl}
          alt={item.englishName}
          onLoad={() => setLoading(false)}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "6px",
            display: loading ? "none" : "block",
          }}
        />
      </td>

      {/* Names */}
      <td>
        <div>{item.englishName}</div>
        <div style={{ marginTop: "5px", color: "#666" }}>{item.tamilName}</div>
      </td>

      {/* Original Rate */}
      <td style={{ textAlign: "center", textDecoration: "line-through" }}>
        {currencyINR(item.originalRate)}
      </td>

      {/* Discount Rate */}
      <td style={{ textAlign: "center" }}>{currencyINR(item.discountRate)}</td>

      {/* Show/Hide Toggle */}
      <td style={{ textAlign: "center" }}>
          {item?.status===false?"Hidden":"Show"}
      </td>

      {/* Actions */}
      <td style={{ textAlign: "center" }}>
        <button className="cracker-row-btn btn-warning" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button className="cracker-row-btn  btn-danger" onClick={() => onDelete(item._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
