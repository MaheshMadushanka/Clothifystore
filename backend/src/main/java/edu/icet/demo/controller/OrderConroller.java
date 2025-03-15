package edu.icet.demo.controller;

import edu.icet.demo.model.Order;
import edu.icet.demo.service.OrderService;
import edu.icet.demo.service.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
@RequestMapping("/Order")
public class OrderConroller {
    @Autowired
    private OrderService orderService;

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveOrder(@RequestBody Order order){
         orderService.saveOrder(order);
    }
}
