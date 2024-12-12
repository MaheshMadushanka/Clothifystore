package edu.icet.demo.service;

import edu.icet.demo.entity.UserEntity;
import edu.icet.demo.model.User;

import java.util.List;

public interface UserService {
    void addUser(User customer);

    List<UserEntity> getAllUser();

    String deleteUserByID(Integer id);

    User searchById(Integer id);

    void updateUser(User customer);
}
