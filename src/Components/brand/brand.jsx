import React from "react";
import Marquee from "react-fast-marquee";
import "./brand.css";

const Brand = () => {
  const images = [
    "/Brand/brand1.jpg",
    "/Brand/brand2.jpg",
    "/Brand/brand3.jpg",
    "/Brand/brand4.jpg",
    "/Brand/brand5.jpg",
    "/Brand/brand6.jpg",
  ];

  return (
    <div className="brand-images-container">
      <h2>Our Brand's</h2>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {images.map((src, index) => (
          <div key={index} className="brand-image-wrapper">
            <img src={src} alt={`Brand ${index + 1}`} className="brand-image" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brand;
