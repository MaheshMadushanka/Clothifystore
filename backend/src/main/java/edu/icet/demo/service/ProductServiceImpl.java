package edu.icet.demo.service;

import edu.icet.demo.entity.ProductEntity;
import edu.icet.demo.repository.ProductRepository;
import org.modelmapper.ModelMapper;
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
        repository.save(mapper.map(item, ProductEntity.class));
    }

    @Override
    public List<ProductEntity> getAllItem() {
        List<ProductEntity> allitem=new ArrayList<>();
        repository.findAll().forEach(allitem::add);
        return allitem;
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
        ProductEntity itemEntity=mapper.map(item, ProductEntity.class);
        Optional<ProductEntity> optionalExistingEntity = repository.findById(itemEntity.getProductID());

        if (optionalExistingEntity.isPresent()) {
            ProductEntity existingEntity = optionalExistingEntity.get();
            repository.save(existingEntity);
            return "Item updated successfully!";
        } else {
            return "Item not found!";
        }
    }

}


