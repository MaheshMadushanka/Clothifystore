package edu.icet.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="order_item")
public class OrderItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderItemID;

    @ManyToOne
    @JoinColumn(name = "orderID",nullable = false)
    private OrderEntity orderID;

    @ManyToOne
    @JoinColumn(name = "productID",nullable = false)
    private ProductEntity productID;

    private Integer orderItemQty;

    private double priceAtPurchase;

}
