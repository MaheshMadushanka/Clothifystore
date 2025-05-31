package edu.icet.demo.service;

import edu.icet.demo.model.Order;
import edu.icet.demo.model.UserOrders;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {
    void saveOrder(Order order);

    String generatePaymentHash(String orderID, BigDecimal amount, String currency);

    ResponseEntity<List<Order>> sendOrderDetails(Integer userID);

//    String getMerchantId();
//
//    String getNotifyUrl();
}
