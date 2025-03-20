// import React, { useState } from "react";

// const Payment = () => {
//   const orderData = localStorage.getItem("orderData");
//   const [orderId] = useState("ORD" + Math.floor(Math.random() * 10000));
//   const totalCost = 100;

//   const startPayment = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ orderId, totalCost, currency: "LKR" }),
//       });

//       const responseData = await response.json();

//       const payment = {
//         ...responseData,
//         first_name: "John",
//         last_name: "Doe",
//         email: "johndoe@gmail.com",
//         phone: "0771234567",
//         address: "No.1, Main Street",
//         city: "Colombo",
//         country: "Sri Lanka",
//       };

//       window.payhere.startPayment(payment);
//     } catch (error) {
//       console.error("Payment initiation failed", error);
//     }
//   };

//   return (
//     <div>
//       <div className="d-block my-3">
//         <div className="custom-control custom-radio">
//           <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
//           <label className="custom-control-label" htmlFor="credit">Credit card</label>
//         </div>
//         <div className="custom-control custom-radio">
//           <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
//           <label className="custom-control-label" htmlFor="debit">Debit card</label>
//         </div>
//         <div className="custom-control custom-radio">
//           <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
//           <label className="custom-control-label" htmlFor="paypal">Paypal</label>
//         </div>
//       </div>

//       {/* <div className="row">
//         <div className="col-md-6 mb-3">
//           <label htmlFor="cc-name">Name on card</label>
//           <input type="text" className="form-control" id="cc-name" placeholder="" required />
//           <small className="text-muted">Full name as displayed on card</small>
//           <div className="invalid-feedback">Name on card is required</div>
//         </div>
//         <div className="col-md-6 mb-3">
//           <label htmlFor="cc-number">Credit card number</label>
//           <input type="text" className="form-control" id="cc-number" placeholder="" required />
//           <div className="invalid-feedback">Credit card number is required</div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-3 mb-3">
//           <label htmlFor="cc-expiration">Expiration</label>
//           <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
//           <div className="invalid-feedback">Expiration date required</div>
//         </div>
//         <div className="col-md-3 mb-3">
//           <label htmlFor="cc-cvv">CVV</label>
//           <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
//           <div className="invalid-feedback">Security code required</div>
//         </div>
//       </div> */}

//       <hr className="mb-4" />

//       <button className="btn btn-primary btn-lg btn-block" type="button" onClick={startPayment}>
//         Continue to checkout
//       </button>
//     </div>
//   );
// };

// export default Payment;
