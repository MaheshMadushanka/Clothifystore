package edu.icet.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.icet.demo.entity.ProductEntity;


public interface ProductRepository extends JpaRepository<ProductEntity,Integer> {

}
