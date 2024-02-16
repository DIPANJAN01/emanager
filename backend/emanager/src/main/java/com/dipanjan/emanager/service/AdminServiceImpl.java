package com.dipanjan.emanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dipanjan.emanager.entities.Admin;
import com.dipanjan.emanager.exceptions.EntityAlreadyExistsException;
import com.dipanjan.emanager.repository.AdminRepository;
import com.dipanjan.emanager.utils.UnwrapOptional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
    AdminRepository adminRepository;

    @Override
    public Admin getAdmin(Long id) {
        Optional<Admin> adminAdmin = adminRepository.findById(id);
        return UnwrapOptional.unwrap(adminAdmin, id, Admin.class);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return (List<Admin>) adminRepository.findAll();
    }

    @Override
    public boolean emailExists(Long id, String email) {
        if (id == null) {
            // System.out.println("Here, id=null" +
            // adminRepository.existsByEmailIgnoreCase(email));
            return adminRepository.existsByEmailIgnoreCase(email);
        }

        Optional<Admin> admin = adminRepository.findByEmailIgnoreCase(email);
        if (admin.isPresent()) {
            if (admin.get().getId() != id)
                return true;
        }

        return false;
    }

    @Override
    public Admin createAdmin(Admin newAdmin) {
        if (adminRepository.existsByEmailIgnoreCase(newAdmin.getEmail()))
            throw new EntityAlreadyExistsException(
                    "Admin with email '" + newAdmin.getEmail() + "' already exists!");

        return adminRepository.save(newAdmin);

    }

    @Override
    public Admin editAdmin(Long id, Admin updatedAdmin) {

        getAdmin(id); // if admin doesn't exist an error will be thrown, otherwise its a valid id
        Optional<Admin> admin = adminRepository.findByEmailIgnoreCase(updatedAdmin.getEmail());
        if (admin.isPresent()) {
            if (admin.get().getId() != id)
                throw new EntityAlreadyExistsException(
                        "Another admin with email '" + updatedAdmin.getEmail() + "' already exists!");
        }
        updatedAdmin.setId(id);
        adminRepository.save(updatedAdmin);
        return updatedAdmin;
    }

    @Override
    public void deleteAdmin(Long id) {
        getAdmin(id);// if adminAdmin doesn't exist an error will be thrown, otherwise its a valid id
        adminRepository.deleteById(id);
    }

}
