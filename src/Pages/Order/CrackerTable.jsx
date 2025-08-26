import React from "react";
import CrackerCategoryRow from "./CrackerCategoryRow";
import CrackerItemRow from "./CrackerItemRow";

const CrackerTable = ({
  crackers,
  brand,
  handleCheckboxChange,
  handleQuantityChange,
  setCrackers,
  setPreviewImage,
  totalRate,
}) => {
  return (
    <table className="table" align="center" style={{ width: "85%" }}>
      <thead>
        <tr className="tablecell" style={{ fontSize: "14px" }}>
          <th className="tablecell">Select Items</th>
          <th className="tablecell">Cracker Name</th>
          <th className="tablecell">Quantity</th>
          <th className="tablecell">Original Rate</th>
          <th className="tablecell">{brand === "hariharan" ? "80%" : "50%"} Discount Rate</th>
        </tr>
      </thead>
      <tbody>
        {crackers.map((category, categoryIndex) => (
          <React.Fragment key={categoryIndex}>
            <CrackerCategoryRow categoryName={category.category} />
            {category.items.map((item, itemIndex) => (
              <CrackerItemRow
                key={`${categoryIndex}-${itemIndex}`}
                item={item}
                categoryIndex={categoryIndex}
                itemIndex={itemIndex}
                categoryName={category.category}
                brand={brand}
                crackers={crackers}
                setCrackers={setCrackers}
                handleCheckboxChange={handleCheckboxChange}
                handleQuantityChange={handleQuantityChange}
                setPreviewImage={setPreviewImage}
              />
            ))}
          </React.Fragment>
        ))}
        <tr>
          <td colSpan="4" style={{ fontWeight: "bold", backgroundColor: "#f1eeee" }}>
            Total Amount
          </td>
          <td className="tablecell" style={{ fontWeight: "bold", backgroundColor: "#f1eeee" }}>
            ₹{totalRate}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CrackerTable;
