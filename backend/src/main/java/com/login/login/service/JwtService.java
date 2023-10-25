/**
 * The JwtService class is responsible for creating JWT tokens, authenticating users, and loading user
 * details.
 */
package com.login.login.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.login.login.model.JwtRequest;
import com.login.login.model.JwtResponse;
import com.login.login.repository.UserRepository;
import com.login.login.util.JwtUtil;
import com.login.login.model.User;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AuthenticationManager authManager;


    // The function creates a JWT token for a user based on their username and password and authenticated.
    public JwtResponse createJwtToken(JwtRequest jwtReq) throws Exception {
        String userName = jwtReq.getUserName();
        String userPassword = jwtReq.getPassword();
        authenticate(userName, userPassword);

        UserDetails userDetails = loadUserByUsername(userName);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);

        User user = userRepo.findById(userName).get();
        return new JwtResponse(user, newGeneratedToken);
    }

    /**
     * The function loads user details by username and returns a UserDetails object if the user is found,
     * otherwise it throws a UsernameNotFoundException.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);

        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    user.getPassword(),
                    getAuthority(user));
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    /**
     * The function `getAuthority` takes a `User` object and returns a set of `SimpleGrantedAuthority`
     * objects based on the user's roles.
     */
    private Set getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRole()));
        });
        return authorities;
    }

    
    /**
     * The function "authenticate" takes a username and password as input, and uses an authentication
     * manager to authenticate the user, throwing exceptions for disabled users or invalid credentials.
     */
    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLE", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
