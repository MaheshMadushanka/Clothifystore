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
    private double orderAmount;
    private String orderAddress;
    private LocalDateTime orderDate;
    private List<OrderItem> orderItems;

}
