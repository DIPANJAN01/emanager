package com.dipanjan.emanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dipanjan.emanager.entities.Branch;
import com.dipanjan.emanager.exceptions.BranchAlreadyExistsException;
import com.dipanjan.emanager.repository.BranchRepository;
import com.dipanjan.emanager.utils.UnwrapOptional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BranchServiceImpl implements BranchService {
    BranchRepository branchRepository;

    @Override
    public Branch getBranch(Long id) {
        Optional<Branch> branch = branchRepository.findById(id);
        return UnwrapOptional.unwrap(branch, id, Branch.class);
    }

    @Override
    public List<Branch> getAllBranches() {
        return (List<Branch>) branchRepository.findAll();
    }

    public boolean checkBranchExists(String branchName) {
        if (branchRepository.existsByNameIgnoreCase(branchName))
            throw new BranchAlreadyExistsException("A branch of name '" + branchName + "' already exists!");

        return false;
    }

    @Override
    public Branch createBranch(Branch newBranch) {

        checkBranchExists(newBranch.getName());// will throw an error if the branch name exists
        return branchRepository.save(newBranch);

    }

    @Override
    public Branch editBranch(Long id, Branch updatedBranch) {

        getBranch(id); // if branch doesn't exist an error will be thrown, otherwise its a valid id

        updatedBranch.setId(id);
        branchRepository.save(updatedBranch);
        return updatedBranch;
    }

    @Override
    public void deleteBranch(Long id) {
        getBranch(id);// if branch doesn't exist an error will be thrown, otherwise its a valid id
        branchRepository.deleteById(id);
    }

}
