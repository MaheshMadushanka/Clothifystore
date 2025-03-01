package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private Integer productID;
    private String product_name;
    private Integer categoryID;
    private String productImageURL;
    private String productPrice;
    private String productQty;
    private String product_description;

    public void setProductImageURL(String imageUrl) {
        this.productImageURL=imageUrl;
    }
}
