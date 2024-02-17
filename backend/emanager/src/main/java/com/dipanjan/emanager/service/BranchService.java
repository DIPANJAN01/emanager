package com.dipanjan.emanager.service;

import java.util.List;

import com.dipanjan.emanager.entities.Branch;

public interface BranchService {
    Branch getBranch(Long id);

    List<Branch> getAllBranches();

    public boolean nameExists(Long id, String name);

    Branch createBranch(Branch updatedBranch);

    Branch editBranch(Long id, Branch updatedBranch);

    void deleteBranch(Long id);
}
