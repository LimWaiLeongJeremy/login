package com.login.login.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.login.login.model.Role;
import com.login.login.model.User;
import com.login.login.repository.RoleRepository;
import com.login.login.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerNewUser(User user) {
        Role role = roleRepo.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);
        user.setPassword(encoderPassword(user.getPassword()));

        return userRepo.save(user);
    }

    // To auto populate the DB
    public void initRolesAndUser() {
        // initialize roles
        Role adminRole = new Role();
        adminRole.setRole("Admin");
        adminRole.setDescription("Admin role");
        roleRepo.save(adminRole);

        Role userRole = new Role();
        userRole.setRole("User");
        userRole.setDescription("User role");
        roleRepo.save(userRole);

        // initialize adminUser
        User adminUser = new User();
        adminUser.setFirstName("Admin");
        adminUser.setLastName("Admin");
        adminUser.setUserName("Admin");
        adminUser.setEmail("admin@test.com");
        adminUser.setPassword(encoderPassword("admin"));
        Set<Role> adminUserRoles = new HashSet<>();
        adminUserRoles.add(adminRole);
        adminUser.setRole(adminUserRoles);
        userRepo.save(adminUser);

        User user = new User();
        user.setFirstName("Adam");
        user.setLastName("Bret");
        user.setUserName("AdamBret");
        user.setEmail("adambret@test.com");
        user.setPassword(encoderPassword("adambret"));
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userRepo.save(user);
    }
    
    private String encoderPassword(String password) {
        return passwordEncoder.encode(password);
    }

}
