    package edu.icet.demo.repository;

    import edu.icet.demo.entity.UserEntity;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;


    public interface UserRepository extends JpaRepository<UserEntity,Integer> {
        @Query("SELECT u FROM UserEntity u WHERE u.userName = :userName ")
        UserEntity findByUserName(@Param("userName") String userName);

    }
