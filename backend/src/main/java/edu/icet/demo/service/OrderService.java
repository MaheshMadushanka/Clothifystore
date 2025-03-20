package edu.icet.demo.service;

import edu.icet.demo.model.Order;

import java.math.BigDecimal;

public interface OrderService {
    void saveOrder(Order order);

    String generatePaymentHash(String orderID, BigDecimal amount, String currency);

//    String getMerchantId();
//
//    String getNotifyUrl();
}
