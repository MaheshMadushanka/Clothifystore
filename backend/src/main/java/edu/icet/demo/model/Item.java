package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    private String itemName;
    private String itemCategary;
    private String itemPrice;
    private String itemQty;
    private String itemDescription;   
}
