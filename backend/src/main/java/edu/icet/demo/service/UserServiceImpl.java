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
import java.util.stream.Collectors;

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
        public List<User> getAllUser() {
            return repository.findAll().stream()
                    .map(user -> mapper.map(user, User.class))
                    .toList(); // Cleaner & simpler
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
    public currentUser signIn(currentUser request) {
        System.out.println("service layer  user name "+request.getUsername());
        UserEntity userEntity=mapper.map((repository.findByUserName(request.getUsername())),UserEntity.class);
        System.out.println(userEntity.getUsername()+"  Name of user");
        if (userEntity.getUsername() == null) {
            System.out.println("User not found in the database.");
            return null;
        }

        if(null!=userEntity  && userEntity.getPassword().equals(request.getPassword())){
            System.out.println(" service layer found user profile from DB "+ userEntity.getUserProfileURl());
            return new currentUser(userEntity.getUserID(), userEntity.getUsername(), userEntity.getPassword(),userEntity.getRole(),userEntity.getUserProfileURl());
        }else {
            System.out.println("not user found");
            return null;
        }

    }

}
