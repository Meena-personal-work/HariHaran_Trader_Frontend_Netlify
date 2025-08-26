import React from "react";

const CrackerCategoryRow = ({ categoryName }) => (
  <tr className="tableRow" style={{ fontSize: "14px" }}>
    <td colSpan="5" style={{ fontWeight: "bold", backgroundColor: "#f1eeee" }}>
      {categoryName}
    </td>
  </tr>
);

export default CrackerCategoryRow;
