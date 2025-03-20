import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { 
  usePayHereScript, 
  initPayHereHandlers, 
  startPayHerePayment, 
  createPaymentObject 
} from '../Payhere';

const UserAddressForm = () => {
    const navigate = useNavigate();
    const storedOrderData = JSON.parse(localStorage.getItem("orderData"));
    const [orderId] = useState("ORD" + Math.floor(Math.random() * 10000));
    const totalCost = storedOrderData ? storedOrderData.totalCost : 0;
    const token = localStorage.getItem("authToken");
    
    // Load PayHere script
    const isPayHereLoaded = usePayHereScript();
    
    // Initialize PayHere handlers when script is loaded
    useEffect(() => {
        if (!isPayHereLoaded) return;
        
        initPayHereHandlers(
            // onCompleted
            (orderId) => {
                console.log("Payment completed for order:", orderId);
                localStorage.setItem("conform", "true");
                saveOrder();
            },
            // onDismissed
            () => {
                console.log("Payment was dismissed");
                localStorage.setItem("conform", "false");
            },
            // onError
            (error) => {
                console.error("Payment error:", error);
                localStorage.setItem("conform", "false");
            }
        );
    }, [isPayHereLoaded]);

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        orderAddressLine1: "",
        orderAddressLine2: "",
        country: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "" // Added email field
    });

    const startPayment = async () => {
        try {
            // Get payment hash/details from backend
            const response = await fetch(`http://localhost:8081/Order/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ orderID: orderId, amount: totalCost, currency: "LKR" }),
            });

            const responseData = await response.json();
            console.log("hash_key  "+responseData.hash_key)
            console.log("order_id  "+responseData.order_id)
            
            // Create payment object
            const paymentData = createPaymentObject(
                {
                    // Order details
                    orderId: responseData.order_id,
                    amount: totalCost,
                    currency: "LKR",
                    items: storedOrderData?.productName || "Product Purchase",
                    // Include hash and merchant ID from backend response
                    hash: responseData.hash_key,                   
                    merchantId: responseData.merchant_id || "1229807",
                    notifyUrl: responseData.notify_url || "http://localhost:8081/Order/notify"
                },
                {
                    // Customer details
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phone: userData.phoneNumber,
                    address: userData.orderAddressLine1,
                    city: userData.state,
                    country: userData.country,
                    deliveryAddress: userData.orderAddressLine1,
                    deliveryCity: userData.state,
                    deliveryCountry: userData.country
                }
            );
            
            // Start payment
            if (isPayHereLoaded) {
                startPayHerePayment(paymentData);
            } else {
                console.error("PayHere script not loaded");
            }
            
        } catch (error) {
            console.error("Payment initiation failed", error);
        }
    };

    const saveOrder = async () => {
        const sendOrder = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            orderAddressLine1: userData.orderAddressLine1,
            orderAddressLine2: userData.orderAddressLine2,
            country: userData.country,
            state: userData.state,
            zipCode: userData.zipCode,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            productId: storedOrderData.productId,
            productName: storedOrderData.productName,
            userID: localStorage.getItem("userID"),
            orderAmount: storedOrderData.orderAmount,
            shippingCost: storedOrderData.shippingCost,
            totalCost: storedOrderData.totalCost
        };

        try {
            const response = await fetch("http://localhost:8081/product/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(sendOrder)
            });

            if (response.ok) {
                console.log("Order saved successfully");
                navigate("/homepage");
                localStorage.setItem("conform", "false");
            } else {
                throw new Error("Failed to save order");
            }
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Failed to save order. Please try again.");
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(userData.phoneNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        
        if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        localStorage.setItem("userAddress", JSON.stringify(userData));
        startPayment();
    };

    return (
        <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Valid first name is required.</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Valid last name is required.</div>
                    </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please enter your phone number.</div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="orderAddressLine1">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderAddressLine1"
                        name="orderAddressLine1"
                        value={userData.orderAddressLine1}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please enter your shipping address.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="orderAddressLine2">Address 2 <span className="text-muted">(Optional)</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="orderAddressLine2"
                        name="orderAddressLine2"
                        value={userData.orderAddressLine2}
                        onChange={handleChange}
                    />
                </div>

                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label htmlFor="country">Country</label>
                        <select
                            className="custom-select d-block w-100"
                            id="country"
                            name="country"
                            value={userData.country}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose...</option>
                            <option>United States</option>
                            <option>Sri Lanka</option>
                        </select>
                        <div className="invalid-feedback">Please select a valid country.</div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="state">State</label>
                        <select
                            className="custom-select d-block w-100"
                            id="state"
                            name="state"
                            value={userData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose...</option>
                            <option>California</option>
                            <option>Colombo</option>
                        </select>
                        <div className="invalid-feedback">Please provide a valid state.</div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="zipCode">Zip</label>
                        <input
                            type="text"
                            className="form-control"
                            id="zipCode"
                            name="zipCode"
                            value={userData.zipCode}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Zip code required.</div>
                    </div>
                </div>

                <hr className="mb-4" />
                <button 
                    className="btn btn-primary btn-lg btn-block" 
                    type="submit"
                    disabled={!isPayHereLoaded}>
                    Continue to checkout
                </button>
            </form>
        </div>
    );
};

export default UserAddressForm;