import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "./ProductDetails.css";


const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1); // Track selected quantity


  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };
  const navigate = useNavigate();

  const handleBuyNow = () => {
    const updatedProduct = {  
      ...product,
      productPrice: Number(product.productPrice), 
    };
    navigate("/order-summary", { state: { product: updatedProduct, quantity } });
  };
  
  if (!product) return <p>No product details available</p>;

  return (
    <div className="product-details-container">
      {/* Left: Product Image */}
      <div className="product-image-container">
        <img src={product.productImageURL} alt="Product" className="product-image" />
      </div>
  {/* Quantity Selection */}
    <div className="quantity-selector">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
        </div>
      {/* Right: Product Info */}
      <div className="product-info">
        <h2 className="product-name">{product.product_name}</h2>
        <p className="product-description">{product.product_description}</p>
        <p className="product-price">Price: ${product.productPrice}</p>

        {/* Buttons in One Line */}
        <div className="product-buttons">
          <button className="homepage-btn buy-now-btn"  onClick={handleBuyNow}>Buy Now</button>
          <button type="button" className="homepage-btn homepage-btn-add">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
