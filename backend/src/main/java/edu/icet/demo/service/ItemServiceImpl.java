package edu.icet.demo.service;

import edu.icet.demo.entity.ItemEntity;
import edu.icet.demo.repository.ItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import edu.icet.demo.model.Item;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final ItemRepository repository;
    private final ModelMapper mapper;

    @Override
    public void addItem(Item item) {
        repository.save(mapper.map(item, ItemEntity.class));
    }

    @Override
    public List<ItemEntity> getAllItem() {
        List<ItemEntity> allitem=new ArrayList<>();
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



} 