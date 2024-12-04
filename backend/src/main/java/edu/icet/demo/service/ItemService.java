package edu.icet.demo.service;

import edu.icet.demo.entity.ItemEntity;
import edu.icet.demo.model.Item;

import java.util.List;

public interface ItemService {

    public void addItem(Item item);

    List<ItemEntity> getAllItem();

    String deleteItem(Integer id);
}
