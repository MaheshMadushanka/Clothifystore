package edu.icet.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.icet.demo.entity.ProductEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductRepository extends JpaRepository<ProductEntity,Integer> {
    @Query("SELECT p FROM ProductEntity p WHERE " +
            "LOWER(p.product_name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.product_description) LIKE LOWER(CONCAT('%', :query, '%')) ")
    List<ProductEntity> searchProduct(String query);

    @Query("SELECT c FROM ProductEntity c WHERE c.categoryID = :category")
    List<ProductEntity> findByCategory(Integer category);
}
