package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    private Integer orderItemID;
    private Integer orderID;
    private Integer productID;
    private Integer orderItemQty;
    private double priceAtPurchase;
}
