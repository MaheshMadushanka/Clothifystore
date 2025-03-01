    package edu.icet.demo.entity;

    import jakarta.persistence.*;
    import lombok.Data;

    import java.util.List;

    @Entity
    @Table(name = "user_role")
    @Data
    public class RoleEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Integer roleId;

        private String rolePosition;

//        @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
//        private List<UserEntity> users;

    }
