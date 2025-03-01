package edu.icet.demo.model;

import edu.icet.demo.entity.RoleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userID;
    private String userName;
    private String userProfileURl;
    private String password;
    private String userEmail;
    private String userAddress;
    private String userNumber;
    private Integer role =0;
}
