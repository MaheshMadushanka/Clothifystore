package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Custormer {
    private String custName;
    private String custEmail;
    private String custAddress;
    private String custNumber;
}
