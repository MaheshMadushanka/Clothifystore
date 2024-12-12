package edu.icet.demo.service;

import edu.icet.demo.entity.ProductEntity;
import edu.icet.demo.model.Product;

import java.util.List;

public interface ProductService {

    public void addItem(Product item);

    List<ProductEntity> getAllItem();

    String deleteItem(Integer id);

    String updateItem(Product item);
}
