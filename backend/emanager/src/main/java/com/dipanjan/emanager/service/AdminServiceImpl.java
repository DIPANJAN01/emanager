package com.dipanjan.emanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dipanjan.emanager.entities.Admin;
import com.dipanjan.emanager.repository.AdminRepository;
import com.dipanjan.emanager.utils.UnwrapOptional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
    AdminRepository empRepository;

    @Override
    public Admin getAdmin(Long id) {
        Optional<Admin> adminAdmin = empRepository.findById(id);
        return UnwrapOptional.unwrap(adminAdmin, id, Admin.class);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return (List<Admin>) empRepository.findAll();
    }

    @Override
    public Admin createAdmin(Admin newAdmin) {
        return empRepository.save(newAdmin);

    }

    @Override
    public Admin editAdmin(Long id, Admin updatedAdmin) {

        getAdmin(id); // if adminAdmin doesn't exist an error will be thrown, otherwise its a valid id
        updatedAdmin.setId(id);
        empRepository.save(updatedAdmin);
        return updatedAdmin;
    }

    @Override
    public void deleteAdmin(Long id) {
        getAdmin(id);// if adminAdmin doesn't exist an error will be thrown, otherwise its a valid id
        empRepository.deleteById(id);
    }

}
