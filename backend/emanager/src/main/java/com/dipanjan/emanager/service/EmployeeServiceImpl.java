package com.dipanjan.emanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dipanjan.emanager.entities.Branch;
import com.dipanjan.emanager.entities.Employee;
import com.dipanjan.emanager.exceptions.EntityAlreadyExistsException;
import com.dipanjan.emanager.repository.EmployeeRepository;
import com.dipanjan.emanager.utils.UnwrapOptional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    BranchService branchService;
    EmployeeRepository empRepository;

    @Override
    public Employee getEmployee(Long id) {
        Optional<Employee> employee = empRepository.findById(id);
        return UnwrapOptional.unwrap(employee, id, Employee.class);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return (List<Employee>) empRepository.findAll();
    }

    @Override
    public boolean emailExists(Long id, String email) {
        if (id == null) {
            // System.out.println("Here, id=null" +
            // adminRepository.existsByEmailIgnoreCase(email));
            return empRepository.existsByEmailIgnoreCase(email);
        }

        Optional<Employee> employee = empRepository.findByEmailIgnoreCase(email);
        if (employee.isPresent()) {
            if (employee.get().getId() != id)
                return true;
        }

        return false;
    }

    @Override
    public Employee createEmployee(Employee newEmployee) {
        if (empRepository.existsByEmailIgnoreCase(newEmployee.getEmail()))
            throw new EntityAlreadyExistsException(
                    "Employee with email '" + newEmployee.getEmail() + "' already exists!");

        Branch branch = branchService.getBranch(newEmployee.getBranch().getId());
        newEmployee.setBranch(branch);

        return empRepository.save(newEmployee);

    }

    @Override
    public Employee editEmployee(Long id, Employee updatedEmployee) {

        getEmployee(id); // if employee doesn't exist an error will be thrown, otherwise its a valid id
        Optional<Employee> employee = empRepository.findByEmailIgnoreCase(updatedEmployee.getEmail());
        if (employee.isPresent()) {
            if (employee.get().getId() != id)
                throw new EntityAlreadyExistsException(
                        "Another employee with email '" + updatedEmployee.getEmail() + "' already exists!");
        }
        Branch branch = branchService.getBranch(updatedEmployee.getBranch().getId());// if branch doesn't exist an error
                                                                                     // will be thrown

        updatedEmployee.setId(id);// now this will override the existing employee with this id in the db
        updatedEmployee.setBranch(branch);
        empRepository.save(updatedEmployee);
        return updatedEmployee;
    }

    @Override
    public void deleteEmployee(Long id) {
        getEmployee(id);// if employee doesn't exist an error will be thrown, otherwise its a valid id
        empRepository.deleteById(id);
    }

}
