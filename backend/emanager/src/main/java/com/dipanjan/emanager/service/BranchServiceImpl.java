package com.dipanjan.emanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dipanjan.emanager.entities.Branch;
import com.dipanjan.emanager.exceptions.EntityAlreadyExistsException;
import com.dipanjan.emanager.repository.BranchRepository;
import com.dipanjan.emanager.utils.UnwrapOptional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BranchServiceImpl implements BranchService {
    private final BranchRepository branchRepository;

    @Override
    public Branch getBranch(Long id) {
        Optional<Branch> branch = branchRepository.findById(id);
        return UnwrapOptional.unwrap(branch, id, Branch.class);
    }

    @Override
    public List<Branch> getAllBranches() {
        return (List<Branch>) branchRepository.findAll();
    }

    public boolean checkNameExists(String branchName) {
        if (branchRepository.existsByNameIgnoreCase(branchName))
            throw new EntityAlreadyExistsException("A branch of name '" + branchName + "' already exists!");

        return false;
    }

    @Override
    public boolean nameExists(Long id, String name) {
        if (id == null) {
            // System.out.println("Here, id=null" +
            // adminRepository.existsByEmailIgnoreCase(email));
            return branchRepository.existsByNameIgnoreCase(name);
        }

        Optional<Branch> branch = branchRepository.findByNameIgnoreCase(name);
        if (branch.isPresent()) {
            if (branch.get().getId() != id)
                return true;
        }

        return false;
    }

    @Override
    public Branch createBranch(Branch newBranch) {

        checkNameExists(newBranch.getName());// will throw an error if the branch name exists
        return branchRepository.save(newBranch);

    }

    @Override
    public Branch editBranch(Long id, Branch updatedBranch) {

        getBranch(id); // if branch doesn't exist an error will be thrown, otherwise its a valid id
        Optional<Branch> branch = branchRepository.findByNameIgnoreCase(updatedBranch.getName());
        if (branch.isPresent()) {
            if (branch.get().getId() != id)
                throw new EntityAlreadyExistsException(
                        "Another branch with name '" + updatedBranch.getName() + "' already exits!");
        }
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
