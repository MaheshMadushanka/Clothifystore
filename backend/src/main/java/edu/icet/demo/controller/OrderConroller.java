package edu.icet.demo.controller;

import edu.icet.demo.entity.OrderItemEntity;
import edu.icet.demo.model.Order;
import edu.icet.demo.model.OrderItem;
import edu.icet.demo.model.UserOrders;
import edu.icet.demo.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
@RestController
@RequestMapping("/Order")
@AllArgsConstructor
public class OrderConroller {
    @Autowired
    private OrderService orderService;

    private final String merchantId="1229807";
    
    private final String notifyUrl="http://localhost:5173/payhere/notify";



    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveOrder(@RequestBody Order order) {
        System.out.println("Received Order Data: " + order);
        for (OrderItem item : order.getOrderItems()) {
            if (item.getProductID() == null) {
                throw new IllegalArgumentException("Product cannot be null for OrderItem");
            }
        }
        // Additional logging to check specific fields
        System.out.println("User ID: " + order.getUserID());
        System.out.println("Total Cost: " + order.getTotalCost());
        System.out.println("Order Items: " + order.getOrderItems());

        orderService.saveOrder(order);
    }
    @GetMapping("/get_order_details/{userID}")
    @ResponseStatus(HttpStatus.ACCEPTED)
        public ResponseEntity<List<Order>> sendOrderDetails(@PathVariable Integer userID){
            return  orderService.sendOrderDetails(userID);
    }


    @PostMapping("/create")
    public Map<String,String> createPayment(@RequestBody Map<String,String> request){
        String orderID = request.get("orderID");
        String amountStr = request.get("amount");
        String currency = request.get("currency");

        if (orderID == null || orderID.isEmpty()) {
            throw new IllegalArgumentException("OrderID is missing");
        }
        if (amountStr == null || amountStr.isEmpty()) {
            throw new IllegalArgumentException("Amount is missing");
        }
        if (currency == null || currency.isEmpty()) {
            throw new IllegalArgumentException("Currency is missing");
        }

        BigDecimal amount = new BigDecimal(amountStr);

        String hashkey=orderService.generatePaymentHash(orderID,amount,currency);
        Map<String,String> paymentDetails=new HashMap<>();
        paymentDetails.put("merchant_id",merchantId);
        paymentDetails.put("order_id",orderID);
        paymentDetails.put("amount",amount.toString());
        paymentDetails.put("currency",currency);
        paymentDetails.put("notify_url", notifyUrl);
        paymentDetails.put("hash_key",hashkey);


        return paymentDetails;
    }
    @PostMapping("/notify")
    public String handlePaymentNotification(@RequestParam Map<String, String> requestParams) {
        String orderId = requestParams.get("order_id");
        String amount = requestParams.get("payhere_amount");
        String currency = requestParams.get("payhere_currency");
        String statusCode = requestParams.get("status_code");
        String md5sig = requestParams.get("md5sig");

        // Verify the hash
        String generatedMd5 = orderService.generatePaymentHash(orderId, new BigDecimal(amount), currency);

        if (generatedMd5.equals(md5sig) && "2".equals(statusCode)) {
            // Payment successful, update database
            System.out.println("Payment successful for Order ID: " + orderId);
            return "SUCCESS";
        }

        return "FAIL";
    }

}
