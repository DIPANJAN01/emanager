package com.dipanjan.emanager.exceptions;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String message) {
        super(message);
    }

    public EntityNotFoundException() {
        super("Entity doesn't exist!");
    }
}
