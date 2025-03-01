//package edu.icet.demo.service;
//
//import edu.icet.demo.entity.UserEntity;
//import edu.icet.demo.model.currentUser;
//import edu.icet.demo.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class MyUserDetailsService implements UserDetailsService {
//    @Autowired
//    private UserRepository repository;
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        UserEntity user = repository.findByUsername(username);
//        System.out.println("load"+username);
//        if(user==null){
//            System.out.println("User Not Found....!");
//            throw  new UsernameNotFoundException("User Not Found....!");
//        }
//
//        return new currentUser(user);
//    }
//}
