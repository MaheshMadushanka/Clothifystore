package edu.icet.demo.repository;

import edu.icet.demo.entity.OrderEntity;
import edu.icet.demo.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity,Integer> {
    List<OrderEntity> findByUser_UserID(Integer userID);
    List<OrderItemEntity> findByOrderID(Integer orderId);


}
