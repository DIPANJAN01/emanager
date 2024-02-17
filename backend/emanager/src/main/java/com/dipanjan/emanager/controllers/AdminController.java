package com.dipanjan.emanager.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.dipanjan.emanager.entities.Admin;
import com.dipanjan.emanager.service.AdminService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
// @CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
@CrossOrigin(origins = "*")
@RequestMapping("/admins")

public class AdminController {
    AdminService adminAdminService;

    @GetMapping("/")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return new ResponseEntity<>(adminAdminService.getAllAdmins(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable Long id) {
        return new ResponseEntity<>(adminAdminService.getAdmin(id), HttpStatus.OK);
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkAdminExits(@RequestParam(required = false) Long id,
            @RequestParam String email) {
        // System.out.println("in exits");
        return new ResponseEntity<>(adminAdminService.emailExists(id, email), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Admin> postAdmin(@RequestBody @Valid Admin adminAdmin) {
        return new ResponseEntity<>(adminAdminService.createAdmin(adminAdmin), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> putAdmin(@PathVariable Long id, @RequestBody @Valid Admin adminAdmin) {
        return new ResponseEntity<>(adminAdminService.editAdmin(id, adminAdmin), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAdmin(@PathVariable Long id) {
        adminAdminService.deleteAdmin(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
