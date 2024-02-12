package com.dipanjan.emanager.exceptions;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {

    private List<String> errorMessages;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp timestamp;

    public ErrorResponse() {
        this("Sorry! Something went wrong.");
    }

    public ErrorResponse(String message) {
        this.errorMessages = Arrays.asList(message);
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public ErrorResponse(List<String> message) {
        this.errorMessages = message;
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

}
