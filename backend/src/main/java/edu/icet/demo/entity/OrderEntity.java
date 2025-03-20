package edu.icet.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private UserEntity userID;
    @Column(nullable = false)
    private Integer phoneNumber;

    @Column(nullable = false)
    private LocalDateTime orderDate = LocalDateTime.now();
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String orderAmount;
    @Column(nullable = false)
    private String orderAddressLine1;

    private String orderAddressLine2;

    private String orderStatus;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String state;
    @Column(nullable = false)
    private Integer zipCode;
    @Column(nullable = false)
    private double shippingCost;
    @Column(nullable = false)
    private double totalCost;
    @OneToMany(mappedBy = "orderID",cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItemList;
}
