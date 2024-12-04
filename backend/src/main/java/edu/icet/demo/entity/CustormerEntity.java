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
@Table(name = "custormer")
public class CustormerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer custID;
    private String custName;
    private String custEmail;
    private String custAddress;
    private String custNumber;
}
