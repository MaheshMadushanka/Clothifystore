package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private Integer productID;
    private String productName;
    private String productCategoryID;
    private String productImageURL;
    private String productPrice;
    private String productQty;
    private String productDescription;
}
