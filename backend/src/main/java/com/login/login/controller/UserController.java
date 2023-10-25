/**
 * The UserController class is a Spring MVC controller that uses the UserService class to initialize roles and users.
 */
package com.login.login.controller;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.login.login.service.UserService;

@Controller
@RequestMapping(path = "/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userSrc;

    // Using @Postconstruct to call a method in UserService class to initialize roles and user.  
    @PostConstruct
    public void initRolesAndUser() {
        userSrc.initRolesAndUser();
    }
}
