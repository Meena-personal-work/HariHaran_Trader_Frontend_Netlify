import React from "react";

const BrandSwitch = ({ brand, setBrand, setLoading }) => {
  const handleBrandChange = (newBrand) => {
    setLoading(true);
    setBrand(newBrand);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div
      className="brand-switch"
      style={{ textAlign: "center", margin: "20px 0" }}
    >
      <div className="brand-buttons-wrapper">
        <button
          onClick={() => handleBrandChange("hariharan")}
          className={`brand-btn ${brand === "hariharan" ? "active" : ""}`}
        >
          Hariharan Trader Crackers
          <span className="discount-badge">80% Discount</span>
        </button>

        <button
          onClick={() => handleBrandChange("ayyan")}
          className={`brand-btn ${brand === "ayyan" ? "active" : ""}`}
        >
          Ayyan Crackers
          <span className="discount-badge">50% Discount</span>
        </button>
      </div>
    </div>
  );
};

export default BrandSwitch;
