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

    @PostConstruct
    public void initRolesAndUser() {
        userSrc.initRolesAndUser();
    }
}
