import React from "react";
import "./BrandLabel.css";

const BrandShowcase = ({ brands }) => {
  return (
    <div className="grid grid-cols-4 gap-1 p-8">
      {brands.map((brand, index) => (
        <div key={index} className="brand-card">
          <img src={brand.image} alt={`Brand ${index}`} className="brand-image" />
          <div className="brand-overlay">
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandShowcase;
