package com.dipanjan.emanager.repository;

import org.springframework.data.repository.CrudRepository;

import com.dipanjan.emanager.entities.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

}