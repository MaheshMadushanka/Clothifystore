import { React, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./OrderSummary.css";
import { useAuth } from "../../../Context/AuthContext";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity } = location.state || {};
  const { user } = useAuth();

  if (!product) return <p>No order details available</p>;

  // Ensure productPrice is a valid number
  const productPrice = Number(product.productPrice) || 0;
  const shippingCost = 5.99;
  const totalCost = productPrice * quantity + shippingCost;

  // Function to save order to backend

  const token = localStorage.getItem("authToken")
  useEffect(() => {
    if (!token) {
      localStorage.setItem("redirectPath", "/order-summary")
      navigate("/login");
    } else {
      const orderData = {
        productId: product.id,
        productName: product.product_name,
        orderAmount: productPrice,
        shippingCost: shippingCost,
        totalCost: totalCost,
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));

    }
  }, [user, navigate, location.pathname]);

  // const saveOrder = async () => {


  //   const orderData = {
  //     productId: product.id, 
  //     productName: product.product_name,
  //     userID:localStorage.getItem("userID"),
  //     orderAmount: productPrice,
  //     shippingCost: shippingCost,
  //     totalCost: totalCost,
  //   };

  //   try {
  //     const response = await axios.post("http://localhost:8081/product/", {
  //       method:"POST",
  //       header:{
  //         "Content-tyep":"application/json",
  //         "Authorization":`Bearer ${token}`
  //       },
  //       body:JSON.stringify(orderData)
  //     });
  //     console.log("Order saved:", response.data);
  //     navigate("/payment"); // Navigate to payment after successful save
  //   } catch (error) {
  //     console.error("Error saving order:", error);
  //     alert("Failed to save order. Please try again.");
  //   }
  // };

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>

      {/* Product Details */}
      <div className="order-item">
        <img src={product.productImageURL} alt="Product" className="order-image" />
        <div>
          <p className="order-name">{product.product_name}</p>
          <p>Quantity: {quantity}</p>
          <p>Price: ${productPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Shipping & Total */}
      <div className="order-total">
        <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
        <h3>Total: ${totalCost.toFixed(2)}</h3>
      </div>

      {/* Buttons */}
      <div className="order-buttons">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Product
        </button>
        <button className="pay-button" >
          <Link to="/userAddressForm">Proceed to Payment</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
