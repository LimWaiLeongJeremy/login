package com.login.login.repository;

import javax.persistence.metamodel.EntityType;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.login.login.model.User;

import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    @Query(value = "SELECT email FROM user WHERE user_name = ?;", nativeQuery = true)
    String getEmailByUsername(String username);

    // @Query(
    // value = "SELECT * FROM user WHERE user_name = ?;",
    // nativeQuery = true
    // )
    // User checkIfUsernameExists(String username);

    @Query(value = "SELECT * FROM user e WHERE BINARY e.user_name = ?" , nativeQuery = true)
    User findByUsername(@Param("username") String username);
}
