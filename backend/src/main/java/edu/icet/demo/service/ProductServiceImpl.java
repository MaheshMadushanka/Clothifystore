package edu.icet.demo.service;

import edu.icet.demo.entity.CategoryEntity;
import edu.icet.demo.entity.ProductEntity;
import edu.icet.demo.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.icet.demo.model.Product;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final ModelMapper mapper;

    @Override
    public void addItem(Product item) {
        System.out.println(item);
        ProductEntity entity = mapper.map(item, ProductEntity.class);

        // Manually set CategoryEntity
        CategoryEntity category = new CategoryEntity();
        category.setCategoryID(item.getCategoryID());

        entity.setCategoryID(category);

        repository.save(entity);
    }

    @Override
    public List<ProductEntity> getAllItem(Integer category) {
        List<ProductEntity> allItems = repository.findAll(); // Fetch all products
        System.out.println("ProductServiceImpl came 1");

        List<ProductEntity> selected = allItems.stream()
                .filter(product -> product.getCategoryID().getCategoryID().equals(category))
                .toList();

        System.out.println("ProductServiceImpl came 2");
        return selected;
    }

    @Override
    public String deleteItem(Integer id) {
        if(repository.existsById(id)){
        repository.deleteById(id);
        return "Delete success!";
        }
        return "not found";
    }

    @Override
    public String updateItem(Product item) {
        System.out.println("/update-product work on service layer");
        ProductEntity productEntity=mapper.map(item, ProductEntity.class);
        Optional<ProductEntity> optionalExistingEntity = repository.findById(productEntity.getProductID());

        if (optionalExistingEntity.isPresent()) {
            ProductEntity existingEntity = optionalExistingEntity.get();
            repository.save(existingEntity);
            return "Item updated successfully!";
        } else {
            return "Item not found!";
        }
    }

    @Override
    public List<ProductEntity> searchProduct(String query) {
        return repository.searchProduct(query);
    }

    @Override
    public List<Product> getProdctByID(Integer id) {
        Optional<ProductEntity> optionalEntity = repository.findById(id);

        if (optionalEntity.isPresent()) {
            Product product = mapper.map(optionalEntity.get(), Product.class);
            return List.of(product);
        } else {
            return List.of();
        }
    }

}


