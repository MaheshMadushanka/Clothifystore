package edu.icet.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class updateUser {
        private Integer userID;
        private String userName;
        private String userProfileURl;
        private String userEmail;
        private String userAddress;
        private String userNumber;
}
