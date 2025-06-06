import React from "react";
import ProductCard from "./ProductCard.jsx";
import "./ProductDisplay.css";

const ProductDisplay = ({ products = [] ,onEditProduct}) => {  
  console.log("ProductDisplay", products);

  return (
    <div className="product-container">
      {Array.isArray(products) && products.length > 0 ? ( 
        products.map((product) => (
          <ProductCard 
            key={product.productID}
            product={product} 
            onEdit={()=>onEditProduct(product.productID)} />
        ))
      ) : (
        <p></p> 
      )}
    </div>
  );
};

export default ProductDisplay;
