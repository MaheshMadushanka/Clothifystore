package edu.icet.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JoinColumn(name = "orderid")
    @JsonBackReference
    private OrderEntity order;

    @ManyToOne
    @JoinColumn(name = "productid", nullable = false)
    private ProductEntity product;

    private Integer orderItemQty;

    private double priceAtPurchase;
}
