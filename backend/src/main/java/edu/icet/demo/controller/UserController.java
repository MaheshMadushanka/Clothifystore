package edu.icet.demo.controller;

import edu.icet.demo.entity.UserEntity;
import edu.icet.demo.model.User;
import edu.icet.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping("/add-user")
    @ResponseStatus(HttpStatus.CREATED)
    public void addUser(@RequestBody User user){
        service.addUser(user);
    }

    @GetMapping("/get-all")
    public List<UserEntity> getAllUser(){
        return service.getAllUser();
    }
    @DeleteMapping("/delete-by-id/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String deleteUserByID(@PathVariable Integer id){
        return service.deleteUserByID(id);
    }

    @GetMapping("search-by-id/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User searchById(@PathVariable Integer id){
        return service.searchById(id);
    }
    @PutMapping("/update-user")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateUser(@RequestBody User user){
        service.updateUser(user);
    }

}
