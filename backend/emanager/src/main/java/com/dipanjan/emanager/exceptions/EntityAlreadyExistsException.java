package com.dipanjan.emanager.exceptions;

public class EntityAlreadyExistsException extends RuntimeException {
    public EntityAlreadyExistsException(String message) {
        super(message);
    }

    public EntityAlreadyExistsException() {
        super("Entity already exists!");
    }

}
