package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOrders {
    private Integer orderID;
    private Integer orderItemQty;

    private String productName;
    private String productImageURL;

    private double orderAmount;
    private double shippingCost;
    private double totalCost;
}
