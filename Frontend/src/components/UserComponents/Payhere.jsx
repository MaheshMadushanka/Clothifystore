import { useEffect, useState } from "react";

// Load the PayHere script
export const usePayHereScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already present
    if (window.payhere) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;

    script.onload = () => {
      console.log("PayHere script loaded");
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load PayHere script");
      setIsLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return isLoaded;
};

// Ensure PayHere handlers are initialized
export const initPayHereHandlers = (onCompleted, onDismissed, onError) => {
  if (!window.payhere) {
    console.error("PayHere is not available yet.");
    return false;
  }

  window.payhere.onCompleted = function (orderId) {
    console.log("Payment completed. Order ID:", orderId);
    if (onCompleted) onCompleted(orderId);
  };

  window.payhere.onDismissed = function () {
    console.log("Payment dismissed");
    if (onDismissed) onDismissed();
  };

  window.payhere.onError = function (error) {
    console.error("Payment error:", error);
    if (onError) onError(error);
  };

  return true;
};

// Start the payment process only if PayHere is available
export const startPayHerePayment = (paymentData) => {
  if (!window.payhere) {
    console.error("PayHere script not loaded. Retrying...");
    setTimeout(() => {
      if (window.payhere) {
        window.payhere.startPayment(paymentData);
      } else {
        console.error("PayHere script is still not available.");
      }
    }, 1000);
    return false;
  }

  window.payhere.startPayment(paymentData);
  return true;
};

// Create a payment object dynamically
export const createPaymentObject = (orderData, customerData) => {

  console.log("orderData", orderData);
  
  return {
    sandbox: true,
    merchant_id: orderData?.merchantId || "1229807",
    return_url: orderData?.returnUrl || undefined,
    cancel_url: orderData?.cancelUrl || undefined,
    notify_url: orderData?.notifyUrl || "http://sample.com/notify",
    order_id: orderData?.orderId || "ORD" + Math.floor(Math.random() * 10000),
    items: orderData?.items || "Product Purchase",
    amount: orderData?.amount || "1000.00",
    currency: orderData?.currency || "LKR",
    hash: orderData?.hash || "",
    first_name: customerData?.firstName || "",
    last_name: customerData?.lastName || "",
    email: customerData?.email || "",
    phone: customerData?.phone || "",
    address: customerData?.address || "",
    city: customerData?.city || "",
    country: customerData?.country || "",
    delivery_address: customerData?.deliveryAddress || customerData?.address || "",
    delivery_city: customerData?.deliveryCity || customerData?.city || "",
    delivery_country: customerData?.deliveryCountry || customerData?.country || "",
    custom_1: customerData?.custom1 || "",
    custom_2: customerData?.custom2 || "",
  };
};
