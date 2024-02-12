package com.dipanjan.emanager.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.dipanjan.emanager.entities.Branch;

public interface BranchRepository extends CrudRepository<Branch, Long> {
    // Custom query method to check if a name exists
    boolean existsByNameIgnoreCase(String name);

    Optional<Branch> findByNameIgnoreCase(String name);
}
