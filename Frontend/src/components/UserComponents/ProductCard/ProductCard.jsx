import { React, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./ProductCard.css";
import no_pictures from "../../../../public/NoImage.png";

const ProductCard = ({ product }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("product")) || []);
  const navigate = useNavigate();
  function addProduct() {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("product", JSON.stringify(updatedCart));
  
    window.dispatchEvent(new Event("cartUpdated"));
  
    console.log("Product Added: ", product);
    console.log("Updated Cart: ", updatedCart);
  }
  

  function viewProduct() {
    navigate("/product-details", { state: { product } }); 
  }

  if (!product) return <p>No product available</p>;

  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <img
          className="homepage-card-img"
          src={product.productImageURL || no_pictures}
          alt="Product"
        />

        <div className="homepage-card-body">
          <h3 className="homepage-product-name">
            {product.product_name || "Product Name"}
          </h3>
          <p className="homepage-product-description">
            {product.product_description || "Product description goes here."}
          </p>
          <p className="homepage-product-price">
            {product.productPrice || "$0.00"}
          </p>
          <div className="homepage-card-actions">
            <button type="button" className="homepage-btn homepage-btn-view" onClick={viewProduct}>
              View
            </button>
            <button type="button" className="homepage-btn homepage-btn-add" onClick={addProduct}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
