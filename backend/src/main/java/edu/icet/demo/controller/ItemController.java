package edu.icet.demo.controller;

import edu.icet.demo.entity.ItemEntity;
import org.springframework.web.bind.annotation.*;

import edu.icet.demo.model.Item;
import edu.icet.demo.service.ItemService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;

import java.util.List;


@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("/add-item")
    @ResponseStatus(HttpStatus.CREATED)
    public void addItem(@RequestBody Item item) {
        itemService.addItem(item);
    }

    @GetMapping("/get-all-item")
    public List<ItemEntity> getAllItem(){
       return itemService.getAllItem();
    }
    @DeleteMapping("/delete-item-byID/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String deleteItem(@PathVariable Integer id){
        return itemService.deleteItem(id);
    }
}
