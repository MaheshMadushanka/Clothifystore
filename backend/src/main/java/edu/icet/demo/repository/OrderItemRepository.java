package edu.icet.demo.repository;

import edu.icet.demo.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity,Integer> {
    List<OrderItemEntity> findByOrder_OrderID(Integer userID);

}
