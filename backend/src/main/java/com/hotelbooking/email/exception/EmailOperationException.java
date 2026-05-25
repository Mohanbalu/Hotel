package com.hotelbooking.email.exception;

import org.springframework.http.HttpStatus;

public class EmailOperationException extends RuntimeException {

    private final HttpStatus status;
    private final String errorCode;

    public EmailOperationException(HttpStatus status, String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
        this.errorCode = errorCode;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
