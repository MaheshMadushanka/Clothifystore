package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    private Integer orderID;
    private Integer userID;
    private String  phoneNumber;
    private String firstName;
    private String lastName;
    private double orderAmount;
    private double shippingCost;
    private double totalCost;
    private String orderAddressLine1;
    private String orderAddressLine2;
    private String country;
    private String state;
    private Integer zipCode;
    private LocalDateTime orderDate =LocalDateTime.now();
    private List<OrderItem> orderItems;
    private String email;
    private String productId;
    private String productName;

}
