package edu.icet.demo.service;

import edu.icet.demo.entity.UserEntity;
import edu.icet.demo.model.User;
import edu.icet.demo.model.currentUser;

import java.util.List;

public interface UserService   {
    void addUser(User customer);

    List<User> getAllUser();

    String deleteUserByID(Integer id);

    User searchById(Integer id);

    void updateUser(User customer);


    currentUser signIn(currentUser request);
}
