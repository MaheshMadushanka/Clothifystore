import React, { useEffect, useState } from 'react';
import "./OrdersPage.css";

function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("authToken");
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8081/Order/get_order_details/${userID}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Expected an array of orders, got:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userID, token]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.orderID} className="border p-4 rounded shadow-sm">
              <p><strong>Order ID:</strong> {order.orderID}</p>
              <p><strong>Status:</strong> Pending</p>
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setSelectedOrder(order)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedOrder && selectedOrder.orderItems && selectedOrder.orderItems.length > 0 && (
        <div className="mt-8 p-4 border-t">
          <h3 className="text-xl font-bold mb-4">Order Details</h3>

          <table className="min-w-full border text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Amount (Rs)</th>
                <th className="p-2 border">Shipping (Rs)</th>
                <th className="p-2 border">Total (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.orderItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 border">{selectedOrder.orderID}</td>
                  <td className="p-2 border">{item.productName}</td>
                  <td className="p-2 border">
                    <img src={item.productImageURL} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-2 border">{item.orderItemQty}</td>
                  <td className="p-2 border">{selectedOrder.orderAmount.toFixed(2)}</td>
                  <td className="p-2 border">{selectedOrder.shippingCost.toFixed(2)}</td>
                  <td className="p-2 border">{selectedOrder.totalCost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
