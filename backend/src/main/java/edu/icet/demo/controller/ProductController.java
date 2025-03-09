package edu.icet.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.icet.demo.entity.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.icet.demo.model.Product;
import edu.icet.demo.service.ProductService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    @Autowired
    private  ObjectMapper mapper;
    @Autowired
    private  ProductService productService;

    @PostMapping(value = "/add-product")
    @ResponseStatus(HttpStatus.CREATED)
    public void addItem(@RequestBody Product product) {
        System.out.println(product.getProduct_name());
        productService.addItem(product);
    }

    @GetMapping("/get-all-product/{category}")
    public List<ProductEntity> getAllItem(@PathVariable Integer category){
        System.out.println(category+"   category");
       return productService.getAllItem(category);
    }

    @DeleteMapping("/delete-product-byID/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String deleteItem(@PathVariable Integer id){
        return productService.deleteItem(id);
    }

    @PutMapping("/update-product")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String updateItem(@RequestBody Product item){
        return productService.updateItem(item);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<ProductEntity> searchProduct(@RequestParam String query){
//        List<ProductEntity> list=productService.searchProduct(query);
//        System.out.println("ok");
//        System.out.println(list);
        return productService.searchProduct(query);

    }
    private String saveImage(MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("Image file is empty");
        }

        String uploadDir = "C:/uploads/images";
        String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        File destinationFile = new File(uploadDir + imageName);

        destinationFile.getParentFile().mkdirs();

        image.transferTo(destinationFile);

        return "uploads/images/" + imageName;
    }
}
