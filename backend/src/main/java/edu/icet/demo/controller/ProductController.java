package edu.icet.demo.controller;

import edu.icet.demo.entity.ProductEntity;
import org.springframework.web.bind.annotation.*;

import edu.icet.demo.model.Product;
import edu.icet.demo.service.ProductService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;

import java.util.List;


@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService itemService;

    @PostMapping("/add-item")
    @ResponseStatus(HttpStatus.CREATED)
    public void addItem(@RequestBody Product item) {
        itemService.addItem(item);
    }

    @GetMapping("/get-all-item")
    public List<ProductEntity> getAllItem(){
       return itemService.getAllItem();
    }

    @DeleteMapping("/delete-item-byID/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String deleteItem(@PathVariable Integer id){
        return itemService.deleteItem(id);
    }

    @PutMapping("/update-item")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String updateItem(@RequestBody Product item){
        return itemService.updateItem(item);
    }
}
