package com.dipanjan.emanager.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.dipanjan.emanager.entities.Admin;

public interface AdminRepository extends CrudRepository<Admin, Long> {

    boolean existsByEmailIgnoreCase(String email);

    Optional<Admin> findByEmailIgnoreCase(String email);
}