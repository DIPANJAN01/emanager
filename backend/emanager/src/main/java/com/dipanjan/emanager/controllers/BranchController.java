package com.dipanjan.emanager.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.dipanjan.emanager.entities.Branch;
import com.dipanjan.emanager.service.BranchService;

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
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
@RequestMapping("/branches")
public class BranchController {
    private final BranchService branchService;

    @GetMapping("/")
    public ResponseEntity<List<Branch>> getAllBranches() {
        return new ResponseEntity<>(branchService.getAllBranches(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Branch> getBranch(@PathVariable Long id) {
        return new ResponseEntity<>(branchService.getBranch(id), HttpStatus.OK);
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkNameExits(@RequestParam(required = false) Long id,
            @RequestParam String name) {
        // System.out.println("in exits");
        return new ResponseEntity<>(branchService.nameExists(id, name), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Branch> postBranch(@RequestBody @Valid Branch branch) {
        return new ResponseEntity<>(branchService.createBranch(branch), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Branch> putBranch(@PathVariable Long id, @RequestBody @Valid Branch branch) {
        return new ResponseEntity<>(branchService.editBranch(id, branch), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBranch(@PathVariable Long id) {
        branchService.deleteBranch(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
