package edu.icet.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.icet.demo.entity.ProductEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ProductRepository extends JpaRepository<ProductEntity,Integer> {
    @Query("SELECT p FROM ProductEntity p WHERE " +
            "LOWER(p.product_name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.product_description) LIKE LOWER(CONCAT('%', :query, '%')) ")
    List<ProductEntity> searchProduct(String query);

    @Query("SELECT p FROM ProductEntity p WHERE p.categoryID.categoryID = :categoryID")
    List<ProductEntity> findByCategory(@Param("categoryID") Integer categoryID);




}
