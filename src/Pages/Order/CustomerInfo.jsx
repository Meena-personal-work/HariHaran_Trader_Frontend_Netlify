import React from "react";

const CustomerInfo = ({
  customerName,
  setCustomerName,
  customerNumber,
  setCustomerNumber,
  customerAddress,
  setCustomerAddress,
  customerState,
  setCustomerState,
}) => {
  return (
    <div className="input-container">
      <div className="customer-container-title">Customer Information</div>
      <div className="input-container-informations">
        <span className="input-fonts">Customer Name:</span>
        <input
          autoFocus
          className="customer-inputbox-name"
          type="text"
          placeholder="Enter Your Name...."
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="input-container-informations">
        <span className="input-fonts">Customer Number:</span>
        <input
          className="customer-inputbox"
          type="number"
          placeholder="Enter Your Contact Number...."
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
        />
      </div>
      <div className="input-container-informations-address">
        <span className="input-fonts">Customer Address:</span>
        <input
          className="customer-inputbox-address"
          type="text"
          placeholder="Enter Your Address...."
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </div>
      <div className="input-container-informations-state">
        <span className="input-fonts">Customer State:</span>
        <select
          className="customer-inputbox-state"
          value={customerState}
          onChange={(e) => setCustomerState(e.target.value)}
        >
          <option value="Choose State">Choose State</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>
      </div>
    </div>
  );
};

export default CustomerInfo;
