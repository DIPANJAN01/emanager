package com.dipanjan.emanager.service;

import java.util.List;

import com.dipanjan.emanager.entities.Admin;

public interface AdminService {
    Admin getAdmin(Long id);

    Admin createAdmin(Admin updatedAdmin);

    public boolean emailExists(Long id, String email);

    List<Admin> getAllAdmins();

    Admin editAdmin(Long id, Admin updatedAdmin);

    void deleteAdmin(Long id);
}
