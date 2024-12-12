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
    private LocalDateTime orderDate = LocalDateTime.now();

    private String orderAmount;

    private String orderShippingAddress;

    private String orderStatus;

    @OneToMany(mappedBy = "orderID",cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItemList;
}
