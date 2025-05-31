import { React, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./OrderSummary.css";
import { useAuth } from "../../../Context/AuthContext";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState(null);

  // Fix: Use optional chaining to prevent error if orderData is null
  const product = orderData?.product || {};
  const quantity = orderData?.quantity || 0;
  const totalCost = orderData?.totalCost || 0; 

  useEffect(() => {
    let productData = location.state?.product;
    let quantityData = location.state?.quantity;

    // If no product data in location.state, try fetching from localStorage
    if (!productData || !quantityData) {
      const storedOrder = localStorage.getItem("orderData");
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);

        productData = parsedOrder.product;
        quantityData = parsedOrder.quantity;
      }
    }

    if (!productData) {
      setOrderData(null);
      console.log("producData  no")
    } else {
      const productPrice = Number(productData.productPrice) || 0;
      const shippingCost = 5.99;
      const calculatedTotalCost = productPrice * quantityData + shippingCost;
      console.log("ordrData save..")
      setOrderData({ product: productData, quantity: quantityData, totalCost: calculatedTotalCost,productAmount:productPrice * quantityData });
      console.log( "product",productData, "quantity: ",quantityData, "totalCost: ",calculatedTotalCost,"productAmount",productPrice * quantityData);
      localStorage.setItem("orderData", JSON.stringify(orderData));
      localStorage.setItem("totalCost", calculatedTotalCost);
      
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.setItem("redirectPath", "/order-summary");
      navigate("/login");
    }
  }, [user, navigate ]);

  useEffect(()=>{
    if (orderData) {
      localStorage.setItem("orderData", JSON.stringify(orderData));
      localStorage.setItem("totalCost", orderData.totalCost);
      localStorage.setItem("quantity",quantity)
      console.log("totalCost  ", orderData.totalCost);
    }
  },[orderData])

  if (!orderData) return <p>No product details available</p>;

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>

      {/* Product Details */}
      <div className="order-item">
        <img src={product.productImageURL} alt="Product" className="order-image" />
        <div>
          <p className="order-name">{product.product_name}</p>
          <p>Quantity: {quantity}</p>
          <p>Price: ${Number(product.productPrice || 0).toFixed(2)}</p>
        </div>
      </div>

      {/* Shipping & Total */}
      <div className="order-total">
        <p>Shipping Cost: $5.99</p>
        <h3>Total: ${totalCost.toFixed(2)}</h3>
      </div>

      {/* Buttons */}
      <div className="order-buttons">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Product
        </button>
        <button className="pay-button">
          <Link to="/userAddressForm">Proceed to Payment</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
