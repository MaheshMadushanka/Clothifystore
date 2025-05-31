package edu.icet.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "users")
public class UserEntity implements UserDetails {
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


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<OrderEntity> orders;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return userName;
    }
}
