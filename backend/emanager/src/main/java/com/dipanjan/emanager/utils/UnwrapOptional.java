package com.dipanjan.emanager.utils;

import java.util.Optional;

import com.dipanjan.emanager.exceptions.EntityNotFoundException;

public class UnwrapOptional {
    public static <T> T unwrap(Optional<T> resource, Long id) {
        if (resource.isPresent())
            return resource.get();
        else
            throw new EntityNotFoundException("Resource with id=" + id + " not found!");
    }

    public static <T> T unwrap(Optional<T> resource, Long id, Class<?> resourceClass) {
        if (resource.isPresent())
            return resource.get();
        else
            throw new EntityNotFoundException(
                    resourceClass.getSimpleName() + " with id=" + id + " not found!");
    }
}
