import React from "react";
import { BarLoader } from "react-spinners";

const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "300px",
    }}
  >
    <BarLoader color="#ff5722" width={300} height={8} speedMultiplier={1.5} />
    <p
      style={{
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#444",
        fontFamily: "Arial",
      }}
    >
      Loading crackers, please wait...
    </p>
  </div>
);

export default LoadingSpinner;
