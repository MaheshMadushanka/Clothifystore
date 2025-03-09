package edu.icet.demo.service;

import edu.icet.demo.entity.UserEntity;
import edu.icet.demo.model.User;
import edu.icet.demo.model.currentUser;
import edu.icet.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private  UserRepository repository;
    @Autowired
    private  ModelMapper mapper;

    @Override
    public void addUser(User customer) {
        repository.save(mapper.map(customer, UserEntity.class));
    }

    @Override
    public List<UserEntity> getAllUser() {
        List<UserEntity> userEntities=new ArrayList<>();
        repository.findAll().forEach(userEntities::add);
        return userEntities;
    }

    @Override
    public String deleteUserByID(Integer id) {
        if(repository.existsById(id)){
            repository.deleteById(id);
            return "deleted..";
        }
        return "not found";
    }

    @Override
    public User searchById(Integer id) {
        return mapper.map(repository.findById(id), User.class);

    }

    @Override
    public void updateUser(User user) {
        repository.save(mapper.map(user, UserEntity.class));
    }

    @Override
    public boolean signIn(currentUser request) {
        UserEntity userEntity=repository.findByUserName(request.getEmail());
        System.out.println(userEntity.getPassword());
        return userEntity.getPassword().equals(request.getPassword());

    }


}
