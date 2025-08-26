// import React, { useState, useEffect } from "react";

// const CrackerItemRow = ({
//   item,
//   categoryIndex,
//   itemIndex,
//   categoryName,
//   brand,
//   crackers,
//   setCrackers,
//   handleCheckboxChange,
//   handleQuantityChange,
//   setPreviewImage,
// }) => {
//   const globalIndex =
//     crackers
//       .slice(0, categoryIndex)
//       .reduce((acc, cat) => acc + cat.items.length, 0) + itemIndex;

//   const [imgSrc, setImgSrc] = useState("");
//   const [loading, setLoading] = useState(true);

//   console.log(item);
  

//   useEffect(() => {
//     setLoading(true);

//     const jpg = `/images/${brand}-crackers/${globalIndex + 1}.jpg`;
//     const png = `/images/${brand}-crackers/${globalIndex + 1}.png`;
//     const fallbackLogo = `/images/${brand}-crackers/${brand}-logo.png`;

//     const img = new Image();
//     img.src = jpg;
//     img.onload = () => setImgSrc(jpg);
//     img.onerror = () => {
//       const img2 = new Image();
//       img2.src = png;
//       img2.onload = () => setImgSrc(png);
//       img2.onerror = () => setImgSrc(fallbackLogo);
//     };
//   }, [brand, globalIndex]);

//   return (
//     <tr key={`${categoryIndex}-${itemIndex}`} className="tableRow">
//       <td className="tablecell" style={{ textAlign: "center" }}>
//         <div className="checkbox-input-container">
//           <input
//             type="checkbox"
//             checked={item.checked || false}
//             onChange={() => handleCheckboxChange(categoryIndex, itemIndex)}
//           />
//         </div>
//       </td>

//       <td className="tablecell" style={{ textAlign: "left", letterSpacing: "-1.1px" }}>
//         <div style={{ position: "relative", width: "60px", height: "60px" }}>
//           {loading && (
//             <div className="image-loading-placeholder">
//               <div className="image-spinner" />
//             </div>
//           )}
//           {imgSrc && (
//           <img
//             src={imgSrc}
//             alt={item.name}
//             onLoad={() => {
//               setLoading(false);
//               const updated = [...crackers];
//               updated[categoryIndex].items[itemIndex].isImgLoaded = true;
//               setCrackers(updated);
//             }}
//             onError={(e) => {
//               setLoading(false)
//               console.error("Image failed to load:", e.target.src);
//               console.error("Event object:", e);
//             }}
//             style={{
//               width: "60px",
//               height: "60px",
//               objectFit: "cover",
//               marginBottom: "8px",
//               borderRadius: "6px",
//               display: loading ? "none" : "block",
//               cursor: "pointer",
//             }}
//             onClick={(e) => setPreviewImage(e.target.src)}
//           />
//           )}
//         </div>

//         <div>{item.name}</div>
//         <div style={{ marginTop: "5px", color: "#666" }}>{item?.tamilName}</div>
//       </td>

//       <td className="tablecell" style={{ textAlign: "center" }}>
//         <select
//           className="dropdown-input-container"
//           disabled={!item.checked}
//           value={item.quantity || ""}
//           onChange={(e) =>
//             handleQuantityChange(
//               categoryIndex,
//               itemIndex,
//               parseInt(e.target.value)
//             )
//           }
//         >
//           <option value="">Select Quantity</option>
//           {[...Array(101).keys()].map((num) =>
//             num === 0 ? null : (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             )
//           )}
//         </select>
//       </td>

//       <td className="tablecell" style={{ textAlign: "center", textDecoration: "line-through" }}>
//         ₹{parseFloat(item.originalRate)}
//       </td>

//       <td className="tablecell" style={{ textAlign: "center" }}>
//         ₹
//         {item.quantity
//           ? item.quantity * parseFloat(item.rate)
//           : parseFloat(item.rate)}
//       </td>
//     </tr>
//   );
// };

// export default CrackerItemRow;


import React, { useState, useEffect } from "react";

const CrackerItemRow = ({
  item,
  categoryIndex,
  itemIndex,
  categoryName,
  brand,
  crackers,
  setCrackers,
  handleCheckboxChange,
  handleQuantityChange,
  setPreviewImage,
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (item.imageUrl) {
      // ✅ Use DB image directly
      const img = new Image();
      img.src = item.imageUrl;
      img.onload = () => {
        setImgSrc(item.imageUrl);
        setLoading(false);
      };
      img.onerror = () => {
        setImgSrc(`/images/${brand}-crackers/${brand}-logo.png`);
        setLoading(false);
      };
    } else {
      // ✅ fallback to brand logo if no image in DB
      setImgSrc(`/images/${brand}-crackers/${brand}-logo.png`);
      setLoading(false);
    }
  }, [item.imageUrl, brand]);

  return (
    <tr key={`${categoryIndex}-${itemIndex}`} className="tableRow">
      {/* Checkbox */}
      <td className="tablecell" style={{ textAlign: "center" }}>
        <div className="checkbox-input-container">
          <input
            type="checkbox"
            checked={item.checked || false}
            onChange={() => handleCheckboxChange(categoryIndex, itemIndex)}
          />
        </div>
      </td>

      {/* Image + Names */}
      <td
        className="tablecell"
        style={{ textAlign: "left", letterSpacing: "-1.1px" }}
      >
        <div style={{ position: "relative", width: "60px", height: "60px" }}>
          {loading && (
            <div className="image-loading-placeholder">
              <div className="image-spinner" />
            </div>
          )}
          {imgSrc && (
            <img
              src={imgSrc}
              alt={item.name}
              onLoad={() => {
                setLoading(false);
                const updated = [...crackers];
                updated[categoryIndex].items[itemIndex].isImgLoaded = true;
                setCrackers(updated);
              }}
              onError={(e) => {
                setLoading(false);
                console.error("Image failed to load:", e.target.src);
                setImgSrc(`/images/${brand}-crackers/${brand}-logo.png`);
              }}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                marginBottom: "8px",
                borderRadius: "6px",
                display: loading ? "none" : "block",
                cursor: "pointer",
              }}
              onClick={(e) => setPreviewImage(e.target.src)}
            />
          )}
        </div>

        <div>{item.name}</div>
        <div style={{ marginTop: "5px", color: "#666" }}>
          {item.tamilName}
        </div>
      </td>

      {/* Quantity dropdown */}
      <td className="tablecell" style={{ textAlign: "center" }}>
        <select
          className="dropdown-input-container"
          disabled={!item.checked}
          value={item.quantity || ""}
          onChange={(e) =>
            handleQuantityChange(
              categoryIndex,
              itemIndex,
              parseInt(e.target.value)
            )
          }
        >
          <option value="">Select Quantity</option>
          {[...Array(101).keys()].map((num) =>
            num === 0 ? null : (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
      </td>

      {/* Original Rate */}
      <td
        className="tablecell"
        style={{ textAlign: "center", textDecoration: "line-through" }}
      >
        ₹{parseFloat(item.originalRate)}
      </td>

      {/* Final Rate */}
      <td className="tablecell" style={{ textAlign: "center" }}>
        ₹
        {item.quantity
          ? item.quantity * parseFloat(item.rate)
          : parseFloat(item.rate)}
      </td>
    </tr>
  );
};

export default CrackerItemRow;
