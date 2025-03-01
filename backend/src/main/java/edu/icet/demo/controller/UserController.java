package edu.icet.demo.controller;

import edu.icet.demo.entity.UserEntity;
import edu.icet.demo.model.currentUser;
import edu.icet.demo.model.User;
import edu.icet.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/add-user")
    @ResponseStatus(HttpStatus.CREATED)
    public void addUser(@RequestBody User customer){
        System.out.println("new user came");
        System.out.println(customer);
        service.addUser(customer);
        //return ("User added successfully");
    }

    @PostMapping("/signin")
    public boolean signIn(@RequestBody currentUser request) {
      return service.signIn(request);
    }

//    @GetMapping("/csrf-token")
//    public Map<String, String> getCsrfToken(CsrfToken csrfToken) {
//        System.out.println("get token");
//        return Collections.singletonMap("token", csrfToken.getToken());
//    }
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
