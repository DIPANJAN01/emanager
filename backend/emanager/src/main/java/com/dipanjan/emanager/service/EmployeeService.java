package com.dipanjan.emanager.service;

import java.util.List;

import com.dipanjan.emanager.entities.Employee;

public interface EmployeeService {
    Employee getEmployee(Long id);

    Employee createEmployee(Employee updatedEmployee);

    List<Employee> getAllEmployees();

    Employee editEmployee(Long id, Employee updatedEmployee);

    void deleteEmployee(Long id);
}
