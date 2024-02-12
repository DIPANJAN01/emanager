package com.dipanjan.emanager.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.dipanjan.emanager.entities.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    boolean existsByEmailIgnoreCase(String email);

    Optional<Employee> findByEmailIgnoreCase(String email);
}