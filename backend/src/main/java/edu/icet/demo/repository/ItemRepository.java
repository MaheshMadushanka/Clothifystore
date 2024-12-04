package edu.icet.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.icet.demo.entity.ItemEntity;

public interface ItemRepository extends JpaRepository<ItemEntity,Integer> {
    
}
