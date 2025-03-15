import React from "react";
import ProductCard from "./ProductCard.jsx";
import "./ProductDisplay.css";

const ProductDisplay = ({ products = [] }) => {  
  console.log("ProductDisplay", products);

  return (
    <div className="product-container">
      {Array.isArray(products) && products.length > 0 ? ( 
        products.map((product) => (
          <ProductCard key={product.productID} product={product} />
        ))
      ) : (
        <p></p> 
      )}
    </div>
  );
};

export default ProductDisplay;
