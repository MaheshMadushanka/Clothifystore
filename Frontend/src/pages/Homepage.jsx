import React from "react";
import PhotoLabel from "../components/UserComponents/Label/PhotoLabel";
import ProductDisplay from "../components/UserComponents/ProductCard/ProductDisplay";

const Homepage = ({ products }) => {
    console.log("Homepage - Products:", products);
    
    if (!Array.isArray(products) || products.length === 0) {
      return <PhotoLabel />;
    }else{
  
    return <ProductDisplay products={products} />;}
  
  };
  
  export default Homepage;
  