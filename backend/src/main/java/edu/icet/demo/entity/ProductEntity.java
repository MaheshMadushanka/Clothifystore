package edu.icet.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name ="products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productID;

    @Column(name = "product_name")
    private String product_name;

    @ManyToOne
    @JoinColumn(name = "categoryID")
    @JsonIgnore  // Prevent serialization of back-reference to CategoryEntity
    private CategoryEntity categoryID;

    private String productImageURL;

    private String productPrice;

    private Integer productQty;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "product_description")
    private String product_description;

    public Integer getProductID() {
        return productID;
    }
}

