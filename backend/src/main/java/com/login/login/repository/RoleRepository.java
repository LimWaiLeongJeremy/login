package com.login.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.login.login.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

}
