package edu.icet.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(nullable = false ,name = "user_name" ,unique = true)
    private String userName;

    @Column(nullable = false)
    private String password;

    private String userProfileURl;

    @Column(unique = true,nullable = false)
    private String userEmail;

    private String userAddress;

    private String userNumber;

    private Integer role;


    @OneToMany(mappedBy = "userID",cascade = CascadeType.ALL)
    private List<OrderEntity> orders;
}
