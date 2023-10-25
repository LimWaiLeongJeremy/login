/**
 * The JwtController class is a REST controller that handles authentication requests and generates JWT
 * tokens.
 */
package com.login.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.login.model.JwtRequest;
import com.login.login.model.JwtResponse;
import com.login.login.service.JwtService;

@RestController
@RequestMapping(path = "/api")
public class JwtController {

    @Autowired
    private JwtService jwtSrc;

    @PostMapping({ "/authenticate" })
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtReq) throws Exception {
        return jwtSrc.createJwtToken(jwtReq);
    }
}
