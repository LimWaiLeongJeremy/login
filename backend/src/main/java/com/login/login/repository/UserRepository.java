// Defining a repository interface for the User entity.
package com.login.login.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.login.login.model.User;

import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    @Query(value = "SELECT email FROM user WHERE user_name = ?;", nativeQuery = true)
    String getEmailByUsername(String username);

    // Using SQL WHERE BINARY to perform a case-sensitive comparison in username.
    @Query(value = "SELECT * FROM user e WHERE BINARY e.user_name = ?", nativeQuery = true)
    User findByUsername(@Param("username") String username);
}
